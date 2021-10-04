<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="7">
      <el-upload
          class="upload-demo"
          :action="getHost + '/productImage'"
          :headers="setHeader"
          :on-remove="handleRemove"
          :on-success="addUploadedPhoto"
          :file-list="fileList"
          list-type="picture"
      >
        <el-button size="small" type="primary">Click to upload</el-button>
      </el-upload>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="13">
      <el-descriptions title="Редактирование" direction="vertical" :column="2" border>
        <el-descriptions-item label="Артикул">
          <el-input placeholder="Please input" v-model="codeInput"/>
        </el-descriptions-item>
        <el-descriptions-item label="Наименование">
          <el-input placeholder="Please input" v-model="nameInput"/>
        </el-descriptions-item>
        <el-descriptions-item label="Цена">
          <el-input-number
              v-model="priceInput"
              controls-position="right"
              :min="0"
              :max="30000"
              :step="1000"
              style="width: 100%;"
          />
        </el-descriptions-item>
        <el-descriptions-item label="Размеры">
          <el-checkbox-group v-model="sizeInput" size="small">
            <el-row>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4"
                      v-for="item in getProductItemSizes"
                      class="size-checkbox">

                <el-checkbox :label="item.size" border></el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-descriptions-item>

        <el-descriptions-item label="Цвет">
          <el-select v-model="colorInput" filterable placeholder="Select">
            <el-option @click="setProductColor({id: item._id, hex: item.hex})"
                       v-for="item in getProductItemColors"
                       :key="item._id"
                       :label="item.color"
                       :value="item._id">
            </el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="Hex">
          <div :style="'width: 29px; height: 29px; background-color: ' + getPreviewItem.hex"/>
        </el-descriptions-item>
        <el-descriptions-item label="Опубликовано">
          <el-switch v-model="publishedInput"/>
        </el-descriptions-item>
        <el-descriptions-item label="Обложка">
          <el-switch v-model="titleInput"/>
        </el-descriptions-item>
        <el-descriptions-item label="Действия">
          <el-button @click="updateProduct" icon="el-icon-delete" type="success" plain>Сохранить</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
</template>

<script>
import ImageCarousel from "@/components/ProductPreview/ImageCarousel";
import ImageDropzone from "@/components/ProductCreateItem/ImageDropzone";
import { mapActions, mapMutations, mapGetters } from 'vuex';
import fetcher from "@/helpers/fetcher";

export default {
  name: "EditedMode",
  components: {
    ImageCarousel, ImageDropzone
  },
  async mounted() {
    await this.fetchSizes();
    await this.fetchColors();
    this.getPreviewItem.images.forEach((image, idx) => {
      this.fileList.push({
        name: `image_${ idx + 1 }`,
        response: image,
        url: this.getHost + '/products/' + image
      });
    });
  },
  data() {
    return {
      fileList: []
    };
  },
  computed: {
    ...mapGetters(['getPreviewItem', 'getProductItemSizes', 'getSelectedSizes',
      'getProductItemColors', 'getSelectedColor', 'getHost']),
    setHeader: () => {
      return { "Authorization": `Bearer ${ localStorage.token }` };
    },
    codeInput: {
      get() {
        return this.getPreviewItem.code;
      },
      set(value) {
        this.setEditedCode(value);
      }
    },
    nameInput: {
      get() {
        return this.getPreviewItem.name;
      },
      set(value) {
        this.setEditedName(value);
      }
    },
    priceInput: {
      get() {
        return this.getPreviewItem.price;
      },
      set(value) {
        this.setEditedPrice(value);
      }
    },
    sizeInput: {
      get() {
        return this.getSelectedSizes;
      },
      set(value) {
        this.setSelectedSizes(value);
      }
    },
    colorInput: {
      get() {
        return this.getSelectedColor;
      },
      set(value) {
        this.setSelectedColor(value);
      }
    },
    publishedInput: {
      get() {
        return this.getPreviewItem.published;
      },
      set(value) {
        this.setPublishedStatus(value);
      }
    },
    titleInput: {
      get() {
        return this.getPreviewItem.title;
      },
      set(value) {
        this.setTitleStatus(value);
      }
    }
  },
  methods: {
    ...mapMutations(['setEditedCode', 'setEditedName', 'setEditedPrice', 'setSelectedSizes',
      'setSelectedColor', 'setProductColor', 'setPublishedStatus', 'setTitleStatus',
      'addUploadedPhoto', 'removeUploadedPhoto']),
    ...mapActions(['fetchSizes', 'fetchColors', 'updateSelectedColor', 'updateProduct']),
    async handleRemove(file) {
      await fetcher(`${ this.getHost }/productImage?filename=${ file.response }`, {
        method: 'DELETE'
      });
      this.removeUploadedPhoto(file.response);
    }
  }
};
</script>

<style scoped>
.upload-demo {
  margin-bottom: 20px;
}

.size-checkbox {
  display: flex;
  justify-content: space-evenly;
}

.el-checkbox {
  margin: 10px 0 12px;
}
</style>
