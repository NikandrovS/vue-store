<template>
  <el-row class="orders-status-filter" justify="center">
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <el-tag size="mini" class="default-tag" @click="ordersFilter('all')">
        Все заказы
      </el-tag>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="status in statusList">
      <el-tag size="mini" :type="statusTag(status.label)" @click="ordersFilter(status.status)">
        {{ status.label }}
      </el-tag>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import formatter from "@/helpers/formatter";

export default {
  name: "OrderFilter",
  computed: {
    ...mapGetters(['getOrderFilter']),
    statusList: () => formatter.orderStates
  },
  methods: {
    ...mapActions(['fetchOrders']),
    ...mapMutations(['unmountedOrderClear', 'setOrderFilter']),
    statusTag: label => formatter.getStatusTagByLabel(label),
    ordersFilter(filter) {
      if (filter === this.getOrderFilter) return;
      localStorage.setItem('order-filter', filter);
      this.setOrderFilter(filter);
      this.unmountedOrderClear();
      this.fetchOrders(filter);
    }
  }
};
</script>

<style lang="scss" scoped>
.orders-status-filter {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding-top: 4px;

  & .el-tag {
    width: 95%;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      opacity: 0.7;
    }
  }

  & .el-tag:first-letter {
    text-transform: capitalize;
  }

  & .default-tag {
    --el-tag-background-color: #f6f6f6;
    --el-tag-border-color: #e5e5e5;
    --el-tag-font-color: #5e6583;
    --el-tag-hover-color: #409eff;
  }
}
</style>
