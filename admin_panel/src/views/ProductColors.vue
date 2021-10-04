<template>
  <Header v-bind:title="'Доступные цвета'"/>
  <el-main>
    <ProductColorsInputForm/>
    <el-divider/>
    <el-row>
      <ProductColorsItem/>
    </el-row>
  </el-main>
</template>

<script>
import Header from "@/components/Header";
import ProductColorsItem from "@/components/ProductColors/ProductColorsItem";
import ProductColorsInputForm from "@/components/ProductColors/ProductColorsInputForm";

export default {
  name: "ProductList",
  components: {
    Header,
    ProductColorsItem,
    ProductColorsInputForm
  }
};
</script>

<style scoped>
  .el-main {
    border-top: 1px solid #dcdfe6;
    padding-top: 20px;
  }
</style>
