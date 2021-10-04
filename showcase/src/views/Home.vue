<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="10">
      <el-row :gutter="20">
        <el-col v-for="item in items" :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
          <el-card class="box-card" shadow="hover" @click="openProductPage(item._id)">
            <img
                :src="`${getHost}/products/${item.images[0]}`"
                alt="product-preview"
            >
            <div class="box-card_title">
              <p>{{ item.name }}</p>
              <span>
                {{ convertPrice(item.price) }}
                <span v-html="currency.symbol"></span>
              </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'Home',
  props: ['currency', 'items', 'update', 'cart'],
  async mounted() {
    if (this.items.length) return
    const res = await fetch(process.env.VUE_APP_BACKEND_HOST + '/productItemAll');
    const items = await res.json()
    this.update(items);
  },
  computed: {
    getHost: () => process.env.VUE_APP_BACKEND_HOST
  },
  methods: {
    openProductPage(id) {
      this.$router.push('/product/' + id);
    },
    convertPrice(value) {
      if (!this.currency.exchange) return value;
      return Math.ceil(value / this.currency.exchange);
    }
  }
};
</script>
<style lang="scss">
.box-card {
  margin-bottom: 20px;
  min-height: 240px;
  cursor: pointer;

  .el-card__body {
    padding: 5px;
  }

  img {
    height: 230px;
    width: 100%;
    object-fit: cover;
  }

  &_title {
    padding: 5px 15px 5px 15px;
    min-height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  p {
    margin: 0 0 5px;
  }
}
</style>
