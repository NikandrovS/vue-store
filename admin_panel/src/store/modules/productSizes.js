import fetcher from "../../helpers/fetcher";
import unAuthorize from "../../helpers/unauthorize";
import { ElNotification } from 'element-plus';

export default {
    state: {
        sizes: [],
        sizeInput: ''
    },
    getters: {
        getInput(state) {
            return state.sizeInput;
        },
        getSizes(state) {
            return state.sizes;
        }
    },
    mutations: {
        updateInput(state, userInput) {
            state.sizeInput = userInput;
        },
        updateSizes(state, sizes) {
            sizes.sort(function (a, b) {
                if (a.size < b.size) {
                    return 1;
                }
                if (a.size > b.size) {
                    return -1;
                }
            });
            state.sizes = sizes;
        },
        clearSizeList(state) {
            state.sizes = [];
        }
    },
    actions: {
        async fetchSizes({ commit, getters }) {
            const res = await fetcher(`${ getters.getHost }/ProductSizes`);
            if (res.status === 403) return unAuthorize(commit);
            const sizes = await res.json();
            commit('updateSizes', sizes);
        },
        async createSize({ dispatch, commit, state, getters }) {
            const url = `${ getters.getHost }/ProductSizes`;
            const data = {
                size: state.sizeInput
            };

            if (data.size) {
                const res = await fetcher(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (res.status === 403) return unAuthorize(commit);

                if (res.status === 200) ElNotification({
                    title: 'Успешно!',
                    type: 'success',
                    position: 'bottom-right'
                });

                commit('updateInput', "");
                await dispatch('fetchSizes');
            }
        },
        async handleRemoveProductSize({ dispatch, getters }, item) {
            const url = `${ getters.getHost }/ProductSizes/`;
            const answer = confirm(`Вы уверенны что хотите удалить ${ item.size } размер?`);

            if (answer) {
                const res = await fetcher(url + item._id, { method: 'DELETE' });

                if (res.status === 200) ElNotification({
                    title: 'Успешно!',
                    type: 'success',
                    position: 'bottom-right'
                });

                await dispatch('fetchSizes');
            }
        }
    }
};
