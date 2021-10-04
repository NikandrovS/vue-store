import router from "@/router";

export default function (commit) {
    localStorage.removeItem('token');
    commit('setAuth', false);
    router.push('/login');
}
