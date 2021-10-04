<template>
  <label for="color">Цвет</label>
  <el-select v-model="color" filterable placeholder="Select">
    <el-option
        v-for="item in getProductItemColors"
        @click="() => updateSelectedColor(item._id)"
        :key="item._id"
        :label="item.label"
        :value="item.color"
        id="color">
    </el-option>
  </el-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ColorChoice",
  data() {
    return {
      color: ''
    };
  },
  computed: mapGetters(['getProductItemColors']),
  methods: mapActions(['fetchColors', 'updateSelectedColor']),
  async mounted() {
    await this.fetchColors();
  }
};
</script>
<style>
.el-select {
  margin-top: 10px;
  width: 100%;
}
</style>
