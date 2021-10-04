<template>
  <Header v-bind:title="'Добавить товар'"/>
  <el-main>
    <el-row>
      <el-col :xs="24" :md="12">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="12" :lg="912" :xl="11" class="item-row">
            <label for="code" class="input-label">
              Артикул
            </label>
            <el-input v-model="codeInput" placeholder="1.3.8" name="code" type="text" id="code"/>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="11" class="item-row">
            <label for="name" class="input-label">
              Наименование
            </label>
            <el-input v-model="nameInput" placeholder="Платье женское" name="name" type="text" id="name"/>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="11" class="item-row">
            <ColorChoice/>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="11" class="item-row">
            <PriceChoice/>
          </el-col>
          <el-col :xs="24" class="item-row">
            <SizeChoice/>
          </el-col>
          <el-col :span="24" class="item-row">
            <PublishCheckbox/>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :md="12">
        <ImageDropzone style="height: 100%; width: 90%; margin: 0 auto"/>
      </el-col>
      <el-col :xs="24">
        <el-button type="primary" @click="createProduct" plain>Сохранить</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import Header from "@/components/Header";
import ColorChoice from "@/components/ProductCreateItem/ColorChoice";
import PriceChoice from "@/components/ProductCreateItem/PriceChoice";
import SizeChoice from "@/components/ProductCreateItem/SizeChoice";
import PublishCheckbox from "@/components/ProductCreateItem/PublishCheckbox";
import ImageDropzone from "@/components/ProductCreateItem/ImageDropzone";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "ProductItem",
  components: {
    Header, ColorChoice, PriceChoice, SizeChoice, PublishCheckbox, ImageDropzone
  },
  methods: {
    ...mapActions(['createProduct']),
    ...mapMutations(['updateCode', 'updateName'])
  },
  computed: {
    ...mapGetters(['getProductItemCode', 'getProductItemName']),
    codeInput: {
      get() {
        return this.getProductItemCode;
      },
      set(value) {
        this.updateCode(value);
      }
    },
    nameInput: {
      get() {
        return this.getProductItemName;
      },
      set(value) {
        this.updateName(value);
      }
    }
  }
};
</script>

<style scoped>
@import url('../../src/libraries/dropzone/dropzone.css');

.el-main {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
}

.item-row {
  margin-bottom: 10px;
}

.el-input {
  margin-top: 10px;
}

.el-button {
  margin-top: 20px;
}
</style>
