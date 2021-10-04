<template>
  <label for="price">Цена</label>
  <el-input-number
      v-model="priceInput"
      name="price"
      :min="0"
      :max="30000"
      :step="1000"
      controls-position="right"
      id="price"
  />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {

  name: "PriceChoice",
  computed: {
    ...mapGetters(['getProductItemPrice']),
    priceInput: {
      get() {
        return this.getProductItemPrice;
      },
      set(value) {
        this.updatePrice(value);
      }
    }
  },
  methods: mapMutations(['updatePrice'])
};
</script>
<style scoped>
.el-input-number {
  margin-top: 10px;
  width: 100%;
}
</style>
