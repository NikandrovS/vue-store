<template>
  <el-form-item label="Добавьте изделие">
    <el-row justify="space-between">
      <el-col :xs="17" :sm="21" :md="20" :lg="21" :xl="22">
        <el-select
            v-model="selectInput"
            filterable
            remote
            placeholder="Введите артикул"
            no-data-text="Нет результатов"
            :remote-method="fetchItemsForSelect"
            :loading="getSelectLoading"
        >
          <el-option
              v-for="item in getSelectOptions"
              :key="item.value"
              :label="item.code + ' ' + item.color"
              :value="item._id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="4" :sm="3" :md="4" :lg="3" :xl="2" class="submit-zone">
        <el-button icon="el-icon-plus" type="success" plain @click="addItemToCart"/>
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: "ItemSelect",
  computed: {
    ...mapGetters(['getSelectOptions', 'getSelectValue', 'getSelectLoading']),
    selectInput: {
      get() {
        return this.getSelectValue;
      },
      set(value) {
        this.updateSelectValue(value);
      }
    }
  },
  methods: {
    ...mapActions(["fetchItemsForSelect", "addItemToCart"]),
    ...mapMutations(["updateSelectValue"])
  }
};
</script>

<style scoped>
.el-select {
  width: 100%;
}

.el-row {
  align-items: baseline;
}

.el-button {

  height: 40px;
}

.submit-zone {
  display: flex;
  justify-content: flex-end;
}
</style>
