<template>
  <el-row justify="center">
    <el-col :xs="9" :sm="10" :md="5" :lg="3" :xl="3">
      <router-link to="/" @click="fetchItems">My Store&nbsp;&#9884;</router-link>
    </el-col>
    <el-col class="header-search" :xs="7" :sm="6" :md="5" :lg="3" :xl="2">
      <el-input size="medium" placeholder="Поиск" v-model="value"/>
    </el-col>
    <el-col class="header-search" :xs="3" :sm="4" :md="3" :lg="2" :xl="2">
      <el-button icon="el-icon-search" circle @click="remoteSearch"/>
    </el-col>
    <el-col class="header-search cart" :xs="5" :sm="4" :md="0" :lg="0" :xl="0">
      <el-button class="cart-button" :class="cart.length ? 'button-badge' : ''" icon="el-icon-shopping-bag-1" round @click="() => this.$router.push('/cart')"/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Header",
  props: ['update', 'cart'],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    async fetchItems() {
      const res = await fetch(process.env.VUE_APP_BACKEND_HOST + '/productItemAll');
      const items = await res.json();
      this.update(items);
    },
    async remoteSearch() {
      const res = await fetch(process.env.VUE_APP_BACKEND_HOST + '/productItemSearch?name=' + this.value);
      const items = await res.json();
      if (items.length) {
        this.value = '';
        this.update(items);
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
.el-row {
  align-items: center;
}
.header-search {
  display: flex;
  justify-content: center;
}

.cart-button {
  position: relative;
}

.button-badge::after {
  content: "";
  height: 7px;
  width: 7px;
  position:absolute;
  top: 5px;
  right: 15px;
  border-radius: 5px;
  background-color: #409eff;
}

@media screen and (min-width: 992px) {
  .cart {
    position: fixed;
    top: 10px;
    right: 60px;
  }

  .cart-button {
    position: initial;
  }

  .button-badge::after {
    top: 8px;
    right: -15px;
  }
}

</style>
