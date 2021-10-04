function updateOptions(options) {
    const update = { ...options };
    if (localStorage.token) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${ localStorage.token }`
        };
    }
    return update;
}

export default function fetcher(url, options) {
    return fetch(url, updateOptions(options));
}
