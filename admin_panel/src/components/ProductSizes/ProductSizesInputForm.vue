<template>
  <el-row>
    <el-col :xs="18" :sm="20" :md="9" :lg="6" :xl="5">
      <el-input type="text" placeholder="Размер" v-model="sizeInput" clearable></el-input>
    </el-col>
    <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="1">
      <el-button icon="el-icon-plus" type="success" plain @click="createSize"></el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "ProductSizesInputForm",
  computed: {
    ...mapGetters(['getInput']),
    sizeInput: {
      get() {
        return this.getInput;
      },
      set(value) {
        this.updateInput(value);
      }
    }
  },
  methods: {
    ...mapActions(['createSize']),
    ...mapMutations(['updateInput'])
  }
};
</script>
