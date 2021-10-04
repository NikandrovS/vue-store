<template>
  <el-checkbox v-model="publishedCheckbox">Опубликовать на сайте</el-checkbox>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "PublishCheckbox",
  computed: {
    ...mapGetters(['getProductPublished']),
    publishedCheckbox: {
      get() {
        return this.getProductPublished;
      },
      set(value) {
        this.togglePublished(value);
      }
    }
  },
  methods: mapMutations(['togglePublished'])
};
</script>

<style scoped>
.el-checkbox {
  margin-bottom: 12px;
}
</style>
