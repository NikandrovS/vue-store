import { ElNotification } from "element-plus";
import unAuthorize from "@/helpers/unauthorize";
import fetcher from "@/helpers/fetcher";
import router from "@/router";

export default {
    state: {
        item: {},
        edited: false,
        editedCode: '',
        editedName: '',
        editedPrice: 0,

        selectedSizes: [],
        selectedColor: '',
        newColorChoice: '',
        uploadedPhotos: []
    },
    getters: {
        getPreviewItem(state) {
            return state.item;
        },
        getPreviewEditedStatus(state) {
            return state.edited;
        },
        getSelectedSizes(state) {
            return state.selectedSizes;
        },
        getSelectedColor(state) {
            return state.selectedColor;
        }
    },
    mutations: {
        setPreviewItem(state, item) {
            state.item = item;
        },
        setPreviewEditedStatus(state) {
            state.selectedSizes = state.item.sizes;
            state.selectedColor = state.item.color;
            state.edited = true;
        },
        setPreviewEditedStatusToFalse(state) {
            state.selectedSizes = [];
            state.selectedColor = [];
            state.newColorChoice = '';
            state.edited = false;
        },
        setEditedCode(state, input) {
            state.item.code = input;
        },
        setEditedName(state, input) {
            state.item.name = input;
        },
        setEditedPrice(state, input) {
            state.item.price = input;
        },
        setSelectedSizes(state, input) {
            state.selectedSizes = input;
        },
        setSelectedColor(state, input) {
            state.selectedColor = input;
        },
        setProductColor(state, { id, hex }) {
            state.newColorChoice = id;
            state.item.hex = hex;
        },
        setPublishedStatus(state, value) {
            state.item.published = value;
        },
        setTitleStatus(state, value) {
            state.item.title = value;
        },
        addUploadedPhoto(state, image) {
            state.item.images.push(image);
        },
        removeUploadedPhoto(state, img) {
            state.item.images = state.item.images.filter(image => image !== img);
        }
    },
    actions: {
        async fetchPreviewItem({ getters, commit }) {
            const res = await fetcher(`${ getters.getHost }/ProductItem/${ router.currentRoute._value.params.id }`);
            if (res.status === 403) return unAuthorize(commit);
            const item = await res.json();
            commit("setPreviewItem", item);
        },
        async restoreItem({ getters, state, commit, dispatch }) {
            const url = `${ getters.getHost }/productItem/restore/${ state.item._id }`;
            const res = await fetcher(url, {
                method: 'PUT'
            });
            if (res.status === 403) return unAuthorize(commit);

            if (res.status === 200) {
                ElNotification({
                    title: 'Успешно!',
                    type: 'success',
                    position: 'bottom-right'
                });
                dispatch('fetchPreviewItem');
            }
        },
        async removeItem({ getters, state }) {
            const answer = confirm(`Вы уверенны что хотите удалить ${ state.item.name }?`);
            if (!answer) return;

            const url = `${ getters.getHost }/productItem/${ state.item._id }`;
            const res = await fetcher(url, {
                method: 'DELETE'
            });

            if (res.status === 200) {
                ElNotification({
                    title: 'Успешно!',
                    type: 'success',
                    position: 'bottom-right'
                });
                router.push(`/admin/products`);
            }
        },
        async updateProduct({ getters, state, commit, dispatch }) {
            const fetchedSizes = getters.getProductItemSizes;
            const sizesArray = [];
            (function getSelectedIds() {
                state.selectedSizes.forEach(size => {
                    for (let i = 0; i < fetchedSizes.length; i++) {
                        if (size === fetchedSizes[i].size) {
                            sizesArray.push(fetchedSizes[i]._id);
                            break;
                        }
                    }
                });
            })();
            const data = {
                code: state.item.code,
                name: state.item.name,
                price: state.item.price,
                sizes: sizesArray,
                published: state.item.published,
                title: state.item.title,
                images: state.item.images
            };
            if (state.newColorChoice) data.color = state.newColorChoice;

            const url = `${ getters.getHost }/productItem/${ state.item._id }`;
            const res = await fetcher(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.status === 403) return unAuthorize(commit);

            if (res.status === 200) {
                commit('setPreviewEditedStatusToFalse');
                dispatch('fetchPreviewItem');
                ElNotification({
                    title: 'Успешно!',
                    type: 'success',
                    position: 'bottom-right'
                });
            }
        }
    }
};
