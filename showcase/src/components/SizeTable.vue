<template>
  <el-table :data="getSizes" style="width: 100%">
    <el-table-column prop="eu" label="EU"></el-table-column>
    <el-table-column prop="ru" label="RU"></el-table-column>
    <el-table-column prop="height" label="Высота"></el-table-column>
    <el-table-column prop="width" label="Ширина"></el-table-column>
  </el-table>
</template>

<script>
import tableSizes from "../helpers/tableSizes";

export default {
  name: "SizeTable",
  computed: {
    getSizes: () => tableSizes
  }
};
</script>
