<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>{{ data.item.code }} {{ data.item.name }} ({{ data.item.color }})</span>
        <el-button icon="el-icon-minus" size="mini" plain type="danger" @click="removeItemFromCart(data.index)"/>
      </div>
    </template>
    <section>
      <img :src="`${getHost}/products/${data.item.images[0]}`" height="160" alt="preview">
      <el-radio-group v-model="radio" size="small">
        <el-radio
            v-for="size in data.item.sizes"
            :label="size"
            border
            @change="updateProductSize({index: data.index, size: radio})"
        >
          {{ size }}
        </el-radio>
      </el-radio-group>
      <span>{{ data.item.price }} RUB</span>
    </section>
  </el-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "ItemCard",
  computed: { ...mapGetters(['getHost']) },
  data() {
    return {
      radio: this.data.item.size || ''
    };
  },
  methods: {
    ...mapMutations(['updateProductSize', 'removeItemFromCart'])
  },
  props: ['data']
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-radio-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-radio.is-bordered {
  width: 80px;
  margin: 0;
}

.el-radio.is-bordered + .el-radio.is-bordered {
  margin: 5px 0 0;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
}
</style>
