<template>
  <Header v-bind:title="'Просмотр заказов'"/>
  <NewOrder v-if="getOrderEditState"/>
  <el-main v-else class="orders-view">
    <OrdersSearch/>
    <el-container>
      <el-aside width="310px">
        <OrderFilter/>
        <InfiniteList/>
      </el-aside>
      <el-main class="active-order-body">
        <ActiveOrder v-if="getActiveOrder._id"/>
      </el-main>
    </el-container>
  </el-main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Header from "@/components/Header";
import OrdersSearch from "@/components/ViewOrders/Order/OrdersSearch";
import OrderFilter from "@/components/ViewOrders/OrderFilter";
import InfiniteList from "@/components/ViewOrders/InfiniteList";
import ActiveOrder from "@/components/ViewOrders/ActiveOrder";
import NewOrder from "@/views/NewOrder";

export default {
  name: "ViewOrders",
  components: { Header, OrdersSearch, OrderFilter, InfiniteList, ActiveOrder, NewOrder },
  beforeUnmount() {
    this.unmountedOrderClear();
    this.setEditState(false);
  },
  computed: {
    ...mapGetters(['getActiveOrder', 'getOrderEditState'])
  },
  methods: {
    ...mapMutations(['unmountedOrderClear', 'setEditState'])
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: calc(100% - 40px);
}

.orders-view {
  padding: 0;
}

.orders-view, .active-order-body {
  border: 0;
}

.active-order-body {
  padding-top: 20px;
}
</style>
