import { createStore } from 'vuex';
import newOrder from "@/store/modules/newOrder";
import orderList from "@/store/modules/orderList";
import productList from "@/store/modules/productList";
import productItem from "@/store/modules/productItem";
import productSizes from "@/store/modules/productSizes";
import productColors from "@/store/modules/productColors";
import productPreview from "@/store/modules/productPreview";
import authorization from "@/store/modules/authorization";

export default createStore({
    state: {
        origin: 'http://193.168.46.104:3001',
        // origin: 'http://192.168.0.3:3001',
        authorized: false
    },
    getters: {
        getHost(state) {
            return state.origin;
        }
    },
    mutations: {},
    actions: {},
    modules: {
        authorization, newOrder, orderList, productList, productItem, productSizes, productColors, productPreview
    }
});
