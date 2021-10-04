<template>
  <el-col class="item" v-for="item in getColors" :key="item._id">
    <el-row justify="center">
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-if="getEditedColorId === item._id" type="text" v-model="editedColor"/>
        <div v-else class="text-container">{{ item.color }}</div>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-color-picker v-if="getEditedColorId === item._id" v-model="editedHex"></el-color-picker>
        <div v-else class="text-container">{{ item.hex }}</div>
      </el-col>
      <el-col :xs="5" :sm="6" :md="6" :lg="3" :xl="3">
        <div v-if="getEditedColorId === item._id"
             v-bind:style="{ backgroundColor: editedHex.length > 2 ? editedHex : '', 'height': '100%' }"/>
        <div v-else :style="{'background-color': item.hex, 'height': '100%'}"/>
      </el-col>

      <el-col :xs="2" :sm="0" :md="0" :lg="1" :xl="1"/>

      <el-col :xs="8" :sm="3" :md="3" :lg="1" :xl="1">
        <el-button v-if="getEditedColorId === item._id" icon="el-icon-check" plain type="success" @click="updateColor(item._id)"/>
        <el-button v-else icon="el-icon-edit-outline" plain type="primary" @click="handleEditProductColor(item)"/>
      </el-col>
      <el-col :xs="8" :sm="3" :md="3" :lg="2" :xl="2">
        <el-button icon="el-icon-delete" plain type="danger" @click="handleRemoveProductColor(item)"/>
      </el-col>

      <el-col :xs="0" :sm="0" :md="0" :lg="1" :xl="2"/>
      <el-divider></el-divider>
    </el-row>
  </el-col>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: "ProductColorsItem",
  computed: {
    ...mapGetters(['getColors', 'getEditedColorId', 'getEditedColor', 'getEditedHex']),
    editedColor: {
      get() {
        return this.getEditedColor;
      },
      set(value) {
        this.updateEditedColor(value);
      }
    },
    editedHex: {
      get() {
        return this.getEditedHex;
      },
      set(value) {
        this.updateEditedHex(value);
      }
    }
  },
  methods: {
    ...mapActions(['fetchColors', 'handleEditProductColor', 'handleRemoveProductColor', 'updateColor']),
    ...mapMutations(['updateEditedColor', 'updateEditedHex', 'updateColors'])
  },
  async mounted() {
    await this.fetchColors();
  },
  beforeUnmount() {
    this.updateColors([]);
  }
};
</script>
<style scoped>
.el-input {
  width: 90%;
}

.text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
