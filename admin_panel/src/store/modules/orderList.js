import fetcher from "@/helpers/fetcher";
import unAuthorize from "@/helpers/unauthorize";

export default {
    state: {
        filter: '',
        orders: [],
        active_order: {},
        orderEditState: false,
    },
    getters: {
        getOrderFilter(state) {
            return state.filter;
        },
        getAllOrders(state) {
            return state.orders;
        },
        getActiveOrder(state) {
            return state.active_order;
        },
        getOrderEditState(state) {
            return state.orderEditState;
        },
    },
    mutations: {
        setOrderFilter(state, value) {
            state.filter = value;
        },
        mountedOrderLoad(state, orders) {
            state.orders = orders;
            state.active_order = orders[0];
        },
        updateOrdersList(state, orders) {
            const array = state.orders.concat(orders);
            state.orders = removeDuplicates(array, it => it.order);

            function removeDuplicates(data, key) {
                return [...new Map(data.map(x => [key(x), x])).values()];
            }
        },
        setActiveOrder(state, order) {
            state.active_order = order;
        },
        unmountedOrderClear(state) {
            state.orders = [];
            state.active_order = {};
        },
        setEditState(state, status) {
            state.orderEditState = status;
        },
    },
    actions: {
        async fetchOrders({ state, commit, getters }, filter) {
            const res = await fetcher(`${ getters.getHost }/limitOrders?filter=${ filter }&skip=${ state.orders.length }`);
            if (res.status === 403) return unAuthorize(commit);

            const orders = await res.json();
            if (!orders.length) return;

            if (!state.orders.length) {
                commit('mountedOrderLoad', orders);
            } else {
                commit('updateOrdersList', orders);
            }
        },
        orderEditButtonHandler({ commit, getters, state }) {
            commit('setEditState', true);
            Object.keys(getters.getOrderForm).forEach(key => {
                if (key === "total") {
                    const total = state.active_order.items.reduce((acc, item) => (acc + item.price), 0);
                    commit('setOrderTotalPrice', total);
                    return true;
                }
                commit('updateOrderForm', [key, state.active_order[key]]);
            });
            commit('appendItemsToCart', state.active_order.items);
            commit('updateDiscount', state.active_order.discount);
            if (state.active_order.percentage) commit('updatePercentage', state.active_order.percentage);
        },
    },
};
