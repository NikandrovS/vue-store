<template>
  <el-table :data="product.items" style="width: 100%">
    <el-table-column type="index"/>
    <el-table-column prop="code" label="Изображение">
      <template #default="scope">
        <el-avatar
            :src="`${getHost}/products/${scope.row.images[0]}`"
            shape="square"
            :size="75"
            fit="cover"
            class="product-preview"
            @click="handleClick(scope.row._id)"
        ></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="code" label="Артикул"/>
    <el-table-column prop="name" label="Наименование"/>
    <el-table-column prop="color" label="Цвет"/>
    <el-table-column prop="size" label="Размер"/>
    <el-table-column prop="price" label="Цена">
      <template #default="scope">
        <b>{{ scope.row.price_after_discount ? scope.row.price_after_discount : scope.row.price }}</b>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "OrderItems",
  props: ['product'],
  computed: mapGetters(['getHost']),
  methods: {
    ...mapMutations(['setPreviewItem']),
    handleClick(id) {
      this.setPreviewItem({});
      this.$router.push(`/admin/product/${ id }`);
    }
  }
};
</script>

<style>
.el-avatar > img {
  width: 100%;
}

.product-preview {
  height: 60px;
  cursor: pointer;
}
</style>
