import { ElNotification } from 'element-plus';
import unAuthorize from "@/helpers/unauthorize";
import fetcher from "@/helpers/fetcher";
import router from "@/router";

export default {
    state: {
        select_options: [],
        select_value: "",
        select_loading: false,
        discount: 0,
        percentage: false,

        orderForm: {
            items_in_cart: [],
            _id: { value: '', required: false },
            name: { value: '', required: true },
            instagram: { value: '', required: false },
            phone: { value: '', required: true },
            email: { value: '', required: false },
            address: { value: '', required: true },
            city: { value: '', required: false },
            country: { value: '', required: false },
            postcode: { value: '', required: false },
            delivery: { value: '', required: true },
            desc: { value: '', required: false },
            total: 0
        }
    },
    getters: {
        getSelectOptions(state) {
            return state.select_options;
        },
        getSelectValue(state) {
            return state.select_value;
        },
        getSelectLoading(state) {
            return state.select_loading;
        },
        getDiscount(state) {
            return state.discount;
        },
        getPercentage(state) {
            return state.percentage;
        },
        getOrderForm(state) {
            return state.orderForm;
        }
    },
    mutations: {
        updateSelectOptions(state, options) {
            state.select_options = options;
        },
        updateSelectValue(state, value) {
            state.select_value = value;
        },
        updateSelectLoading(state, status) {
            state.select_loading = status;
        },
        updateOrderForm(state, [input, value]) {
            state.orderForm[input].value = value;
        },

        updateDiscount(state, value) {
            state.discount = value;
        },
        updatePercentage(state) {
            state.percentage = !state.percentage;
        },

        updateItemsInCart(state) {
            if (!state.select_value) return;
            const product = state.select_options.filter(item => item._id === state.select_value)[0];
            product.size = "";
            state.orderForm.total += product.price;
            state.orderForm.items_in_cart.push(product);
        },
        appendItemsToCart(state, items) {
            state.orderForm.items_in_cart = items;
        },
        removeItemFromCart(state, index) {
            const removed = state.orderForm.items_in_cart.splice(index, 1);
            state.orderForm.total -= removed[0].price;
            if (state.discount > state.orderForm.total) state.discount = state.orderForm.total;
        },
        setOrderTotalPrice(state, sum) {
            state.orderForm.total = sum;
        },
        updateProductSize(state, data) {
            state.orderForm.items_in_cart[data.index].size = data.size;
        },
        setStoreAddress(state) {
            state.orderForm.address.value = "MY STORE: Социалистическая ул., д.221";
            state.orderForm.city.value = "Санкт-Петербург";
            state.orderForm.country.value = "Россия";
            state.orderForm.postcode.value = "191119";
        },
        setDefaultAddress(state) {
            state.orderForm.address.value = "";
            state.orderForm.city.value = "";
            state.orderForm.country.value = "";
            state.orderForm.postcode.value = "";
        },
        updateOrderFormRequiredStatus(state, [city, country, postcode]) {
            state.orderForm.city.required = city;
            state.orderForm.country.required = country;
            state.orderForm.postcode.required = postcode;
        },
        clearOrderInputs(state) {
            state.orderForm = {
                items_in_cart: [],
                _id: { value: '', required: false },
                name: { value: '', required: true },
                instagram: { value: '', required: false },
                phone: { value: '', required: true },
                email: { value: '', required: false },
                address: { value: '', required: true },
                city: { value: '', required: false },
                country: { value: '', required: false },
                postcode: { value: '', required: false },
                delivery: { value: '', required: true },
                desc: { value: '', required: false },
                total: 0
            };
        }
    },
    actions: {
        async fetchItemsForSelect({ commit, getters }, query) {
            if (query === '') {
                commit('updateSelectOptions', []);
                return;
            }
            commit('updateSelectLoading', true);
            const options = await fetcher(`${ getters.getHost }/productItem?code=${ query }`);
            if (options.status === 403) return unAuthorize(commit);
            const parsedOptions = await options.json();
            commit('updateSelectOptions', parsedOptions);
            commit('updateSelectLoading', false);
        },
        addItemToCart({ commit }) {
            commit('updateItemsInCart');
            commit('updateSelectValue', "");
        },
        setDeliveryType({ commit }, value) {
            switch (value) {
                case "selfDelivery":
                    commit('setStoreAddress');
                    commit('updateOrderFormRequiredStatus', [false, false, false]);
                    break;
                case "dostavkaClub":
                    commit('setDefaultAddress');
                    commit('updateOrderFormRequiredStatus', [true, false, false]);
                    break;
                case "cdek":
                    commit('setDefaultAddress');
                    commit('updateOrderFormRequiredStatus', [true, true, false]);
                    break;
                case "pochta":
                    commit('setDefaultAddress');
                    commit('updateOrderFormRequiredStatus', [true, true, true]);
                    break;
                case "ems":
                    commit('setDefaultAddress');
                    commit('updateOrderFormRequiredStatus', [true, true, true]);
                    break;
            }
        },
        clearOrderForm({ commit, state }) {
            commit('clearOrderInputs');
            commit('updateSelectValue', "");
            commit('updateSelectOptions', []);
            commit('updateDiscount', 0);
            if (state.percentage) commit('updatePercentage');
        },
        async createOrder({ dispatch, state, getters, commit }, edit = false) {
            if (!await dispatch('formValidation')) return;
            const data = {
                items: state.orderForm.items_in_cart,
                name: state.orderForm.name.value,
                instagram: state.orderForm.instagram.value,
                phone: state.orderForm.phone.value,
                email: state.orderForm.email.value,
                address: state.orderForm.address.value,
                city: state.orderForm.city.value,
                country: state.orderForm.country.value,
                postcode: state.orderForm.postcode.value,
                delivery: state.orderForm.delivery.value,
                desc: state.orderForm.desc.value,
                discount: state.discount,
                percentage: state.percentage
            };
            if (state.discount && state.percentage) {
                data.items.map(item => {
                    item.price_after_discount = item.price * ((100 - state.discount) / 100);
                    return item;
                });
            }
            if (state.discount && !state.percentage) {
                data.items.map(item => {
                    item.price_after_discount = item.price - Math.ceil(state.discount / state.orderForm.items_in_cart.length);
                    return item;
                });
            }

            if (edit) {
                const url = `${ getters.getHost }/editOrder?id=${ state.orderForm._id.value }`;
                const res = await fetcher(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (res.status === 403) return unAuthorize(commit);
                if (res.status === 200) {
                    commit('clearOrderInputs');
                    const editedOrder = await res.json();
                    commit('setActiveOrder', editedOrder);

                    ElNotification({
                        title: 'Успешно!',
                        message: `Изменения сохранены.`,
                        type: 'success',
                        position: 'bottom-right'
                    });
                    commit('setEditState', false);
                }
                return;
            }

            const url = `${ getters.getHost }/newOrder`;
            const res = await fetcher(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.status === 403) return unAuthorize(commit);
            if (res.status === 200) {
                const createdItem = await res.json();
                commit('clearOrderInputs');
                ElNotification({
                    title: 'Успешно!',
                    message: `Заказ создан. Номер заказа #${ createdItem.order }`,
                    type: 'success',
                    position: 'bottom-right'
                });
                router.push(`orders`);
            }
        },
        formValidation({ state }) {
            let validation = true;
            for (const [key, input] of Object.entries(state.orderForm)) {
                if (key === "items_in_cart") continue;

                if (input.required && input.value === "") {
                    validation = false;
                    setTimeout(() => {
                        ElNotification({
                            title: 'Внимание!',
                            message: `Не заполнено поле ${ key }`,
                            type: 'warning',
                            position: 'bottom-right'
                        });
                    }, 300);
                }
            }

            if (!state.orderForm.items_in_cart.length) {
                validation = false;
                setTimeout(() => {
                    ElNotification({
                        title: 'Внимание!',
                        message: 'Добавьте товары к заказу',
                        type: 'warning',
                        position: 'bottom-right'
                    });
                }, 300);
            }
            state.orderForm.items_in_cart.forEach(item => {
                if (item.size === "") {
                    validation = false;
                    setTimeout(() => {
                        ElNotification({
                            title: 'Внимание!',
                            message: `Не указан размер для изделия ${ item.code } ${ item.name }`,
                            type: 'warning',
                            position: 'bottom-right'
                        });
                    }, 300);
                }
            });
            return validation;
        }
    }
};
