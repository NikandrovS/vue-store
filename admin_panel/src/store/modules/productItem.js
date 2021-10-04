import router from "@/router";
import { ElNotification } from 'element-plus';
import unAuthorize from "@/helpers/unauthorize";
import fetcher from "@/helpers/fetcher";

export default {
    state: {
        code: '',
        name: '',
        price: 0,
        color: '',
        published: true,
        selectedSizes: [],
        images: [],
        sizes: [],
        colors: [],
        uploaded: false
    },
    getters: {
        getProductItemCode(state) {
            return state.code;
        },
        getProductItemName(state) {
            return state.name;
        },
        getProductSelectedColor(state) {
            return state.color;
        },
        getProductSelectedSizes(state) {
            return state.selectedSizes;
        },
        getProductPublished(state) {
            return state.published;
        },
        getProductItemPrice(state) {
            return state.price;
        },
        getProductItemImages(state) {
            return state.images;
        },

        getProductItemSizes(state) {
            return state.sizes;
        },
        getProductItemColors(state) {
            return state.colors;
        },
        getUploadedStatus(state) {
            return state.uploaded;
        }
    },
    mutations: {
        updateCode(state, input) {
            state.code = input;
        },
        updateName(state, input) {
            state.name = input;
        },
        updateSelectedColor(state, id) {
            state.color = id;
        },
        updateSelectedSizes(state, array) {
            state.selectedSizes = array;
        },
        togglePublished(state) {
            state.published = !state.published;
        },
        updatePrice(state, input) {
            state.price = input;
        },
        updateColors(state, colors) {
            state.colors = colors;
        },
        updateUploadStatus(state) {
            state.uploaded = true;
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
        appendImages(state) {
            const imgArray = [];
            const dropzone = document.getElementById('productDropzone').dropzone;

            dropzone.files.forEach(file => {
                if (file.xhr.status === 200) {
                    imgArray.push(file.xhr.response);
                }
            });

            state.images = imgArray;
        }
    },
    actions: {
        async createProduct({ commit, dispatch, getters, state }) {
            commit('appendImages');

            const check = await dispatch('validateForm');
            if (check.length) {
                check.forEach(message => {
                    setTimeout(() => {
                        ElNotification(message);
                    }, 300);
                });
                return;
            }

            const data = {
                code: state.code,
                name: state.name,
                price: state.price,
                color: state.color,
                sizes: state.selectedSizes,
                published: state.published,
                images: state.images
            };

            await dispatch('clearInputs');
            const url = `${ getters.getHost }/productItem`;
            const res = await fetcher(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.status === 403) return unAuthorize(commit);
            if (res.status === 200) {
                commit('updateUploadStatus');
                ElNotification({
                    title: 'Успешно!',
                    type: 'success',
                    position: 'bottom-right'
                });
            }
            const createdItem = await res.json();
            router.push(`product/${ createdItem._id }`);
        },
        toggleCheckbox({ commit, state }, { status, id }) {
            const arr = state.selectedSizes;

            if (status) {
                arr.push(id);
            } else {
                arr.filter(size => size === id);
            }
            commit('updateSelectedSizes', arr);
        },
        updateSelectedColor({ commit }, id) {
            commit('updateSelectedColor', id);
        },
        async removeFile({ getters }, file) {
            await fetcher(`${ getters.getHost }/productImage?filename=${ file.xhr.response }`, {
                method: 'DELETE'
            });
        },
        async removeUploadedFiles({ state, dispatch }) {
            if (state.uploaded) return;

            const files = document.getElementById('productDropzone').dropzone.files;
            for (const file of files) {
                await dispatch('removeFile', file);
            }
        },
        clearInputs({ state }) {
            state.code = '';
            state.name = '';
            state.price = 0;
            state.color = '';
            state.published = true;
            state.selectedSizes = [];
            state.images = [];
        },
        validateForm({ state }) {
            const errArr = [];
            if (state.code === "") {
                errArr.push({
                    title: 'Внимание!',
                    message: 'Не заполнено поле артикул.',
                    type: 'warning',
                    position: 'bottom-right'
                });
            }
            if (state.name === "") {
                errArr.push({
                    title: 'Внимание!',
                    message: 'Не заполнено поле наименование.',
                    type: 'warning',
                    position: 'bottom-right'
                });
            }
            if (state.color === "") {
                errArr.push({
                    title: 'Внимание!',
                    message: 'Не выбран цвет изделия.',
                    type: 'warning',
                    position: 'bottom-right'
                });
            }
            if (!state.selectedSizes.length) {
                errArr.push({
                    title: 'Внимание!',
                    message: 'Не указаны размеры изделия.',
                    type: 'warning',
                    position: 'bottom-right'
                });
            }
            return errArr;
        },
        initializeProductDropzone({ getters, dispatch }, Dropzone) {
            const dropzoneForm = document.getElementById('productDropzone');
            Dropzone.autoDiscover = false;

            new Dropzone(dropzoneForm, {
                url: `${ getters.getHost }/productImage`,
                acceptedFiles: "image/jpeg,image/jpg,image/png",
                addRemoveLinks: true,
                dictRemoveFile: "&#10006;",
                dictInvalidFileType: "Некорректное расширение файла.",
                headers: {
                    Authorization: `Bearer ${ localStorage.token }`
                },
                init: function () {
                    this.on("complete", async function (file) {
                        const link = file.previewElement.children[1].lastChild;
                        link.addEventListener("click", async () => {
                            await dispatch('removeFile', file);
                        });
                    });
                }
            });
            dropzoneForm.classList.add('dropzone');
        }
    }
};
