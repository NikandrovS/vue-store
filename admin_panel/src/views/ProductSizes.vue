<template>
  <Header v-bind:title="'Доступные размеры'"/>
  <el-main>
    <ProductSizesInputForm/>
    <el-divider></el-divider>
    <el-row :gutter="12">
      <ProductSizesItem/>
    </el-row>
  </el-main>
</template>

<script>
import Header from "@/components/Header";
import ProductSizesItem from "@/components/ProductSizes/ProductSizesItem";
import ProductSizesInputForm from "@/components/ProductSizes/ProductSizesInputForm";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(['getSizes']),
  components: {
    Header,
    ProductSizesItem,
    ProductSizesInputForm
  }
};
</script>

<style scoped>
.el-main {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
}
</style>
