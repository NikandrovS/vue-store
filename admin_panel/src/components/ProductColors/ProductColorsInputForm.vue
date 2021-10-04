<template>
  <el-row>
    <el-col :xs="16" :sm="8" :md="8" :lg="4" :xl="5">
      <el-input type="text" placeholder="Цвет" v-model="colorInput" clearable></el-input>
    </el-col>
    <el-col :xs="4" :sm="2" :md="2" :lg="2" :xl="1">
      <el-color-picker v-model="hexInput"></el-color-picker>
    </el-col>
    <el-col :xs="4" :sm="2" :md="2" :lg="2" :xl="1">
      <el-button icon="el-icon-plus"  type="success" plain @click="createColor()"/>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: "ProductColorsInputForm",
  computed: {
    ...mapGetters(['getColorInput', 'getHexInput']),
    colorInput: {
      get() {
        return this.getColorInput;
      },
      set(value) {
        this.updateColorInput(value);
      }
    },
    hexInput: {
      get() {
        return this.getHexInput;
      },
      set(value) {
        this.updateHexInput(value);
      }
    }
  },
  methods: {
    ...mapActions(['createColor']),
    ...mapMutations(['updateColorInput', 'updateHexInput'])
  }
};
</script>
