<template>
  <div v-if="!cart.length" class="empty">
    <p>Пока тут ничего нет</p>
  </div>
  <el-row justify="center">
    <el-col v-for="(product, idx) in this.cart" :xs="24" :sm="18" :md="18" :lg="18" :xl="14" class="cart-item">
      <CartItem
          v-bind:product="product"
          v-bind:idx="idx"
          v-bind:currency="currency"
          v-bind:cart="cart"
      />
    </el-col>
  </el-row>
  <el-row v-if="cart.length" justify="center">
    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="14">
      <h3>Итоговая сумма: {{ convertPrice() }}<span v-html="currency.symbol"></span></h3>
    </el-col>
    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="14">
      <CartActions v-bind:cart="cart"/>
    </el-col>
  </el-row>
</template>

<script>
import CartItem from "../components/CartItem";
import CartActions from "../components/CartActions";

export default {
  name: "Cart",
  components: { CartItem, CartActions },
  props: ['currency', 'items', 'update', 'cart'],
  methods: {
    convertPrice() {
      if (!this.currency.exchange) {
        return this.cart.reduce((acc,product) => {
          return acc + product.price
        }, 0)
      }
      return this.cart.reduce((acc,product) => {
        return acc + Math.ceil(product.price / this.currency.exchange);
      }, 0)
    },
  }
};
</script>

<style scoped lang="scss">
.empty {
  padding: 100px 0;

  p {
    text-align: center;
    vertical-align: center;
  }
}

.cart-item {
  margin-bottom: 15px;
}

h3{
  margin-top: 3px;
  text-align: right;
}
</style>
