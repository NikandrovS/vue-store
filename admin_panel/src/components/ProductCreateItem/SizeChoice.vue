<template>
  <span>Размеры</span>
  <el-checkbox-group v-model="checkboxGroup" size="medium">
    <el-checkbox v-for="item in getProductItemSizes"
                 :key="item._id"
                 :label="item.size"
                 border
                 @change="(status) =>toggleCheckbox({status, id: item._id})">
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "SizeChoice",
  computed: mapGetters(['getProductItemSizes']),
  methods: {
    ...mapActions(['fetchSizes', 'toggleCheckbox'])
    // ...mapMutations(['requireCheckbox'])
  },
  data() {
    return {
      checkboxGroup: []
    };
  },
  async mounted() {
    await this.fetchSizes();
  }
};
</script>
<style scoped>
.el-checkbox {
  margin: 10px 0 12px;
}
</style>
