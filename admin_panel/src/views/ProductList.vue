<template>
  <Header v-bind:title="'Все товары'"/>
  <el-main>
    <ProductTable/>
  </el-main>
</template>

<script>
import Header from "@/components/Header";
import ProductTable from "@/components/ProductList/ProductTable";

export default {
  name: "ProductList",
  components: { Header, ProductTable }
};
</script>
<style>
.el-main {
  border-top: 1px solid #dcdfe6;
  padding-top: 0;
}
</style>
