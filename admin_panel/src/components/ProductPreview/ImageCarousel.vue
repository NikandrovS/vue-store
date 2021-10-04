<template>
  <el-carousel height="500px" :autoplay="false" ref="carousel">
    <el-carousel-item v-for="item in getPreviewItem.images" :key="item">
      <img :src="getHost + '/products/' + item" alt="image">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "ImageCarousel",
  computed: mapGetters(['getPreviewItem', 'getHost']),
  mounted() {
    setTimeout(() => {
      this.$refs.carousel.next();
    }, 100);
  }
};
</script>

<style scoped>
img {
  height: inherit;
  width: 100%;
  object-fit: cover;
}
</style>
