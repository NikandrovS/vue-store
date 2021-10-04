<template>
  <el-table
      @row-click="handleClick"
      :data="getProductList"
      stripe
      class="product-table"
      :default-sort="{prop: 'code', order: 'descending'}"
  >
    <el-table-column
        prop="code"
        :sort-method="compare"
        sortable
        label="Артикул">
    </el-table-column>
    <el-table-column
        prop="name"
        label="Наименование">
    </el-table-column>
    <el-table-column
        prop="color"
        label="Цвет">
    </el-table-column>
    <el-table-column
        prop="price"
        sortable
        label="Цена">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import codeSort from "@/helpers/codeSort";

export default {
  name: "ProductTable",
  async mounted() {
    await this.fetchProducts();
  },
  computed: mapGetters(['getProductList']),
  methods: {
    ...mapActions(['fetchProducts']),
    compare: (a, b) => codeSort(a, b),
    handleClick(row) {
      this.$router.push(`/admin/product/${ row._id }`);
    }
  }
};
</script>

<style scoped>
.product-table {
  width: 100%;
  cursor: pointer;
}
</style>
