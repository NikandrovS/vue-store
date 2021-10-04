<template>
  <div class="button-block">
    <el-button
        v-if="order.status === 'confirmed'"
        icon="el-icon-edit-outline"
        plain
        type="primary"
        @click="setStatus([order._id, 'sent'])"
    >
      Отправлен
    </el-button>

    <el-button
        v-if="order.status === 'new' || order.status === 'unpaid'"
        icon="el-icon-sold-out"
        plain
        type="success"
        @click="setStatus([order._id, 'confirmed'])"
    >
      В обработку
    </el-button>

    <el-button
        v-if="order.status === 'new'"
        icon="el-icon-money"
        plain type="warning"
        @click="setStatus([order._id, 'unpaid'])"
    >
      Ждет оплаты
    </el-button>

    <el-button
        v-if="order.status === 'new' || order.status === 'confirmed'"
        icon="el-icon-edit-outline"
        plain
        type="info"
        @click="orderEditButtonHandler()"
    >
      Изменить
    </el-button>

    <el-button
        v-if="order.status !== 'deleted'"
        icon="el-icon-delete"
        plain type="danger"
        @click="setStatus([order._id, 'deleted'])"
    >
      Удалить
    </el-button>

    <el-button
        v-if="order.status === 'deleted'"
        icon="el-icon-delete"
        plain
        type="info"
        @click="setStatus([order._id, 'new'])"
    >
      Восстановить
    </el-button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import fetcher from "@/helpers/fetcher";
import router from "@/router";

export default {
  name: "ButtonBlock",
  computed: mapGetters(['getHost']),
  props: ['order'],
  methods: {
    ...mapActions(['orderEditButtonHandler']),
    ...mapMutations(['setActiveOrder', 'setAuth']),
    async setStatus([id, status]) {
      const data = { id, status };
      const res = await fetcher(`${ this.getHost }/setStatus`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.status === 403) {
        localStorage.removeItem('token');
        this.setAuth(false);
        router.push('/login');
      }
      const updatedOrder = await res.json();
      this.setActiveOrder(updatedOrder);
    }
  }
};
</script>

<style lang="scss" scoped>

.button-block {
  display: flex;
  flex-direction: column;
  align-items: center;

  & .el-button {
    width: 160px;
    margin: 0 0 10px;
  }
}
</style>
