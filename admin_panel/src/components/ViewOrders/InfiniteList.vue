<template>
  <ul class="infinite-list tag-row" v-infinite-scroll="() => fetchOrders(getOrderFilter)" style="overflow:auto">
    <li v-for="order in getAllOrders"
        class="infinite-list-item"
        :class="[getActiveOrder.order === order.order && 'active']"
        @click="setActiveOrder(order)">
      <div class="li_header" :style="{'color':getColor(order.status)}">
        <span>
          <i :class="getIcon(order.status)"></i>&nbsp;<b>#{{ order.order }}</b>
        </span>
        <span style="font-size: var(--el-font-size-small);">
          {{ orderPrice(order.items) }} &#8381;
        </span>
      </div>
      <div class="customer-name">
        <span style="font-size: var(--el-font-size-extra-small);">
          {{ order.name }}
        </span>
      </div>
      <div class="order-date">
        <span style="font-size: var(--el-font-size-extra-small);">{{ dateFormat(order.createdAt) }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import formatter from "@/helpers/formatter";

export default {
  name: "InfiniteList",
  mounted() {
    if (localStorage['order-filter']) this.setOrderFilter(localStorage['order-filter']);
  },
  computed: {
    ...mapGetters(['getOrderFilter', 'getAllOrders', 'getActiveOrder']),
  },
  methods: {
    ...mapActions(['fetchOrders']),
    ...mapMutations(['setOrderFilter', 'setActiveOrder']),
    dateFormat: timestamp => formatter.dateFormat(timestamp),
    orderPrice: items => formatter.calculateOrderPrice(items),
    getIcon: status => formatter.getStatusData(status).icon,
    getColor: status => formatter.getStatusColor(status),
  },
};
</script>

<style lang="scss" scoped>
.infinite-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  border-right: 1px solid #dcdfe6;

  & li {
    padding: 10px 10px 10px 15px;
    cursor: pointer;
  }

  & li:nth-child(2n) {
    background-color: #f5f5f5;
  }

  & .active:nth-child(1n) {
    background-color: #ecf5ff;
  }
}

.li_header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}

.customer-name {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.customer-name, .order-date {
  text-align: start;
}

.tag-row {
  height: calc(100% - 56px);
}

@media screen and (max-width: 1200px) {
  .tag-row {
    height: calc(100% - 77px);
  }
}

@media screen and (max-width: 992px) {
  .tag-row {
    height: calc(100% - 149px);
  }
}
</style>
