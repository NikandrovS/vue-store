export default ({
    state: {
        authorized: false
    },
    getters: {
        getAuth(state) {
            return state.authorized;
        }
    },
    mutations: {
        setAuth(state, value) {
            state.authorized = value;
        }
    },
    actions: {}
});
