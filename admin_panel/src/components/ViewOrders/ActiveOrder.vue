<template>
  <el-row>
    <el-col :span="16">
      <div>
        <div class="order-head">
          <span class="order-head__id">#{{ getActiveOrder.order }}</span>
          <el-tag :type="statusTag(getActiveOrder.status)" size="small" class="order-head__tag">
            {{ getActiveOrder.status }}
          </el-tag>
          <span class="order-head__date">{{ dateFormat(getActiveOrder.updatedAt) }}</span>
        </div>
        <h5>Контактная информация</h5>
        <div class="customer">
          <el-avatar
              shape="square"
              size="large"
              src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
          <div class="customer__contacts">
            <span>{{ getActiveOrder.name }}</span>
            <span v-if="getActiveOrder.instagram">@{{ getActiveOrder.instagram }}</span>
            <span>tel: {{ getActiveOrder.phone }}</span>
            <span v-if="getActiveOrder.email">{{ getActiveOrder.email }}</span>
          </div>
        </div>
        <CustomerAddress v-bind:order="getActiveOrder"/>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <ButtonBlock v-bind:order="getActiveOrder"/>
    </el-col>
  </el-row>
  <div v-if="getActiveOrder.desc" class="description">{{ getActiveOrder.desc }}</div>
  <div v-if="getActiveOrder.wishes" class="wishes">{{ getActiveOrder.wishes }}</div>
  <el-divider></el-divider>
  <OrderItems v-bind:product="getActiveOrder"/>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomerAddress from "@/components/ViewOrders/Order/CustomerAddress";
import ButtonBlock from "@/components/ViewOrders/Order/ButtonBlock";
import OrderItems from "@/components/ViewOrders/Order/OrderItems";
import formatter from "../../helpers/formatter";

export default {
  name: "OrderInfo",
  components: { CustomerAddress, ButtonBlock, OrderItems },
  computed: mapGetters(['getActiveOrder']),
  methods: {
    statusTag: status => formatter.getStatusTag(status),
    dateFormat: timestamp => formatter.dateFormat(timestamp)
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 24px;
}

.order-head {
  text-align: left;
  display: flex;
  align-items: center;

  &__id {
    font-size: var(--el-font-size-extra-large);
  }

  &__date {
    font-size: var(--el-font-size-small);
  }

  &__tag {
    margin: 0 15px;

    &:first-letter {
      text-transform: uppercase;
    }
  }
}

h5 {
  text-align: left;
}

.description {
  background-color: #EBE3BC;
}

.wishes {
  background-color: #B0EBCA;
}

.wishes, .description {
  padding: 20px 30px;
  text-align: left;
}

.customer {
  display: flex;
  align-items: center;

  &__contacts span {
    font-size: var(--el-font-size-base);
  }

  &__contacts span:not(:last-child) {
    margin-bottom: 5px;
  }
}

.el-avatar {
  margin: 10px 15px;
}

.customer-address, .customer__contacts {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>
