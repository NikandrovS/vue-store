<template>
  <el-card>
    <el-row justify="space-between">
      <el-col :span="4" class="product-data">
        <el-avatar
            shape="square"
            :size="75"
            fit="cover"
            :src="`${getHost}/products/${product.images[0]}`"/>
      </el-col>
      <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" class="product-data">
        <span class="hidden-xs-only">{{ product.code }}</span>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="product-data">
        {{ product.name }}
      </el-col>
      <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3" class="product-data">
        <span class="hidden-xs-only">{{ product.color }}</span>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="product-data">
        {{ product.size }}
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="product-data">
        <p><span v-html="currency.symbol"></span>&nbsp;{{ convertPrice(product.price) }}</p>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="product-data">
        <el-button icon="el-icon-close" circle @click="removeItem(idx)"></el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import 'element-plus/lib/theme-chalk/display.css';

export default {
  name: "CartItem",
  props: ['cart', 'product', 'idx', 'currency'],
  computed: {
    getHost: () => process.env.VUE_APP_BACKEND_HOST
  },
  methods: {
    removeItem(idx) {
      this.cart.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    convertPrice(value) {
      if (!this.currency.exchange) return value;
      return Math.ceil(value / this.currency.exchange);
    },
  },
};
</script>

<style scoped>
.el-card {
  width: 100%;
}
.product-data {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
