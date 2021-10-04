<template>
  <el-container>
    <el-header>
      <Header v-bind:update="updateItems" v-bind:cart="cart"/>
    </el-header>
    <el-main>
      <router-view
          v-bind:currency="currency"
          v-bind:items="items"
          v-bind:update="updateItems"
          v-bind:cart="cart"
      />
    </el-main>
    <el-footer>
      <Footer v-bind:currency="currency" v-bind:update="updateCurrency"/>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  components: {
    Header, Footer
  },
  mounted() {
    const cart = localStorage.getItem('cart');
    this.cart = JSON.parse(cart) || [];
  },
  data() {
    return {
      items: [],
      cart: [],
      currency: {
        symbol: '&#8381;',
        label: 'Rubles',
      },
    };
  },
  methods: {
    updateItems(value) {
      this.items = value;
    },
    updateCurrency(value) {
      this.currency = value;
    },
  }
};
</script>

<style lang="scss">
html,
body,
#app,
.el-container {
  height: 100%;
}

body {
  margin: 0 0 8px;
}

.el-header, {
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  background-color: #f1f1f1;
  a {
    cursor: pointer;
    text-decoration: none;
    color: #333333;
  }
}

.el-main {
  flex: 1 0 auto;
  //padding-top: 0;
}

.el-avatar > img {
  width: 100%;
}

.el-footer {
  flex: 0 0 auto;
}
</style>
