import unAuthorize from "@/helpers/unauthorize";
import fetcher from "@/helpers/fetcher";

export default {
    state: {
        productList: []
    },
    getters: {
        getProductList(state) {
            return state.productList;
        }
    },
    mutations: {
        updateProductList(state, products) {
            state.productList = products;
        }
    },
    actions: {
        async fetchProducts({ commit, getters }) {
            const res = await fetcher(`${ getters.getHost }/ProductItemAll`);
            if (res.status === 403) return unAuthorize(commit);
            const products = await res.json();
            commit('updateProductList', products);
        }
    }
};
