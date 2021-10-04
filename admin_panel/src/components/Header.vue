<template>
  <el-header class="title">
    <h1>{{ title }}</h1>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  props: ['title']
};
</script>

<style scoped>
.title {
  background-color: #f5f5f5;
}

h1 {
  font-size: var(--el-font-size-large);
}
</style>
