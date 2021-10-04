<template>
  <el-row :gutter="20" justify="space-between">
    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
      <el-button type="info" plain @click="clearCart">Очистить корзину</el-button>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
      <el-button type="primary" plain @click="this.$router.push('/cart/continue')">Продолжить</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CartActions",
  props: ['cart'],
  methods: {
    clearCart() {
      this.cart.splice(0, this.cart.length)
    }
  }
};
</script>

<style scoped>
.el-col {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.el-button {
  width: 100%;
}
</style>
