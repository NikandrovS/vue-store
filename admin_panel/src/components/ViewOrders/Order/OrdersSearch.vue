<template>
  <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="Поиск заказов"
      @select="handleSelect"
      class="orders-search"
      value-key="search"
      popper-class="droopy"
  ></el-autocomplete>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import formatter from "@/helpers/formatter";
import fetcher from "@/helpers/fetcher";

export default {
  name: "OrdersSearch",

  data() {
    return {
      state: ''
    };
  },
  computed: mapGetters(['getHost']),
  methods: {
    ...mapMutations(['setActiveOrder']),
    async querySearchAsync(queryString, cb) {
      const res = await fetcher(`${ this.getHost }/ordersSearch?search=${ queryString }`);
      const orders = await res.json();

      formatter.dropDownStringCreator(orders);
      cb(orders);
    },
    handleSelect(item) {
      this.setActiveOrder(item);
      this.state = '';
    }
  }
};
</script>

<style lang="scss">
.orders-search {
  width: 100%;

  & input {
    border-radius: 0;
    border-right: 0;
    border-left: 0;
  }
}

.droopy li {
  font-size: var(--el-font-size-medium);
}
</style>
