<template>
  <el-col v-for="item in getSizes" :key="item._id" :xs="24" :sm="12" :md="6" :lg="4" :xl="3" class="item-row">
    <el-card shadow="never">
      <el-row>
        <el-col :span="16">{{ item.size }}</el-col>
        <el-col :span="8">
          <el-button icon="el-icon-delete" plain type="info" @click="handleRemoveProductSize(item)"/>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: "ProductSizesItem",
  computed: mapGetters(['getSizes']),
  methods: {
    ...mapActions(['fetchSizes', 'handleRemoveProductSize']),
    ...mapMutations(['clearSizeList'])
  },
  async mounted() {
    this.fetchSizes();
  },
  beforeUnmount() {
    this.clearSizeList();
  }
};
</script>

<style scoped>
.el-col {
  align-self: center;
}

.item-row {
  margin-bottom: 12px;
}
</style>
