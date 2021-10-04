<template>
  <form id="productDropzone" :action="getHost + '/profile'">
    <div class="dz-default dz-message">
      <button class="dz-button" type="button">Добавьте файлы для загрузки</button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dropzone from "@/libraries/dropzone/dropzone";

export default {
  name: "ImageDropzone",
  computed: mapGetters(['getHost']),
  methods: mapActions(['initializeProductDropzone', 'removeUploadedFiles']),
  mounted() {
    this.initializeProductDropzone(Dropzone);
  },
  async beforeUnmount() {
    await this.removeUploadedFiles();
  }
};
</script>
