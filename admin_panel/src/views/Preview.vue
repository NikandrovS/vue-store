<template>
  <Header v-bind:title="getPreviewItem.name"/>
  <el-main>
    <EditedMode v-if="getPreviewEditedStatus"/>
    <el-row v-else justify="space-around">
      <el-col :xs="24" :sm="24" :md="9" :lg="7" :xl="6">
        <ImageCarousel/>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="12" :xl="14">
        <el-descriptions direction="vertical" :column="2" border>
          <el-descriptions-item label="Артикул">{{ getPreviewItem.code }}</el-descriptions-item>
          <el-descriptions-item label="Наименование">{{ getPreviewItem.name }}</el-descriptions-item>
          <el-descriptions-item label="Цена">{{ getPreviewItem.price }}</el-descriptions-item>
          <el-descriptions-item label="Размеры">
            <el-tag v-for="size in getPreviewItem.sizes">{{ size }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="Цвет">{{ getPreviewItem.color }}</el-descriptions-item>
          <el-descriptions-item label="Hex">
            <div :style="'width: 29px; height: 29px; background-color: ' + getPreviewItem.hex"/>
          </el-descriptions-item>
          <el-descriptions-item label="Опубликовано">
            {{ statusTransform(getPreviewItem.published) }}
          </el-descriptions-item>
          <el-descriptions-item label="Обложка">
            {{ statusTransform(getPreviewItem.title) }}
          </el-descriptions-item>
          <el-descriptions-item label="Действия">
            <el-row gutter="20">
              <el-col :xs="12" :sm="6" :md="8" :lg="8" :xl="4">
                <el-button icon="el-icon-edit" type="warning" plain @click="setPreviewEditedStatus">
                  Изменить
                </el-button>
              </el-col>
              <el-col :xs="12" :sm="6" :md="8" :lg="8" :xl="4">
                <el-button
                    v-if="getPreviewItem.deleted"
                    icon="el-icon-delete"
                    type="info"
                    plain
                    @click="restoreItem"
                >Восстановить
                </el-button>
                <el-button
                    v-else
                    icon="el-icon-delete"
                    type="danger"
                    plain
                    @click="removeItem"
                >Удалить
                </el-button>
              </el-col>
            </el-row>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import Header from "@/components/Header";
import ImageCarousel from "@/components/ProductPreview/ImageCarousel";
import EditedMode from "@/components/ProductPreview/EditedMode";
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: "Preview",
  components: {
    Header, ImageCarousel, EditedMode
  },
  async mounted() {
    await this.fetchPreviewItem();
  },
  beforeUnmount() {
    this.setPreviewEditedStatusToFalse();
    this.setPreviewItem({});
  },
  computed: mapGetters(['getPreviewItem', 'getPreviewEditedStatus']),
  methods: {
    ...mapActions(['fetchPreviewItem', 'removeItem', 'restoreItem']),
    ...mapMutations(['setPreviewEditedStatus', 'setPreviewEditedStatusToFalse', 'setPreviewItem']),
    statusTransform(status) {
      if (status) return "Да";
      return "Нет";
    }
  }
};
</script>
<style scoped>
.el-main {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
}
.el-tag {
  margin-right: 10px;
}
</style>
