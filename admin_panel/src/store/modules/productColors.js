import { ElNotification } from "element-plus";
import fetcher from "../../helpers/fetcher";
import unAuthorize from "../../helpers/unauthorize";

export default {
    state: {
        colors: [],
        editedId: '',
        editedColor: '',
        editedHex: '',
        colorInput: '',
        hexInput: ''
    },
    getters: {
        getColors(state) {
            return state.colors;
        },
        getEditedColorId(state) {
            return state.editedId;
        },
        getEditedColor(state) {
            return state.editedColor;
        },
        getEditedHex(state) {
            return state.editedHex;
        },
        getColorInput(state) {
            return state.colorInput;
        },
        getHexInput(state) {
            return state.hexInput;
        }
    },
    mutations: {
        updateColors(state, colors) {
            state.colors = colors;
        },
        updateEditedId(state, id) {
            state.editedId = id;
        },
        updateEditedColor(state, color) {
            state.editedColor = color;
        },
        updateEditedHex(state, hex) {
            state.editedHex = hex;
        },
        updateColorInput(state, color) {
            state.colorInput = color;
        },
        updateHexInput(state, hex) {
            state.hexInput = hex;
        }
    },
    actions: {
        async fetchColors({ commit, getters }) {
            const res = await fetcher(`${ getters.getHost }/productColors`);
            if (res.status === 403) unAuthorize(commit);
            const colors = await res.json();
            commit('updateColors', colors);
        },
        async createColor({ state, commit, dispatch, getters }) {
            const url = `${ getters.getHost }/productColors`;
            const data = {
                color: state.colorInput,
                hex: state.hexInput
            };
            if (data.color && data.hex) {
                const res = await fetcher(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (res.status === 403) unAuthorize(commit);

                if (res.status === 200) ElNotification({
                    title: 'Успешно!',
                    type: 'success',
                    position: 'bottom-right'
                });

                dispatch('clearProductColorsInputs');
                dispatch('fetchColors');
            }
        },
        handleEditProductColor({ commit }, item) {
            commit('updateEditedId', item._id);
            commit('updateEditedColor', item.color);
            commit('updateEditedHex', item.hex);
        },
        async handleRemoveProductColor({ dispatch, getters, commit }, item) {
            const answer = confirm(`Вы уверенны что хотите удалить ${ item.color } цвет?`);
            const url = `${ getters.getHost }/productColors/`;
            if (answer) {
                const res = await fetcher(url + item._id, { method: 'DELETE' });
                if (res.status === 403) unAuthorize(commit);
                if (res.status === 200) ElNotification({
                    title: 'Успешно!',
                    type: 'success',
                    position: 'bottom-right'
                });
                await dispatch('fetchColors');
            }
        },
        async updateColor({ state, commit, dispatch, getters }, id) {
            const url = `${ getters.getHost }/productColors/`;
            const data = {
                color: state.editedColor,
                hex: state.editedHex
            };
            if (data.color && data.hex) {
                await fetcher(url + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                commit('updateEditedId', "");
                commit('updateEditedColor', "");
                commit('updateEditedHex', "");
                dispatch('fetchColors');
            }
        },
        clearProductColorsInputs({ commit }) {
            commit('updateColorInput', "");
            commit('updateHexInput', "");
        }
    }
};
