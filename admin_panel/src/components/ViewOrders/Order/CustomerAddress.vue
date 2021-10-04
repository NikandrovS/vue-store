<template>
  <div class="customer-address">
    <h5>Доставка - {{ getDeliveryLabel(order.delivery) }}</h5>
    <span class="address-string">{{ order.address }}</span>
    <span class="address-string">{{ order.city }}</span>
    <span class="address-string">{{ order.country }}</span>
    <span class="address-string">{{ order.postcode }}</span>
  </div>
</template>

<script>
import deliveryTypes from "@/helpers/delivery_types";

export default {
  name: "CustomerAddress",
  props: ['order'],

  methods: {
    getDeliveryLabel: type => deliveryTypes.getLabel(type)
  }
};
</script>

<style scoped>
.address-string {
  margin-left: 10px;
  font-size: var(--el-font-size-base);
}
</style>
