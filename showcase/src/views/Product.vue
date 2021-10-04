<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="20" :md="18" :lg="15" :xl="12">
      <el-card>
        <el-row justify="space-around">
          <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
            <el-carousel height="500px" ref="carousel">
              <el-carousel-item v-for="item in this.item.images" :key="item">
                <img :src="getHost + '/products/' + item" alt="image">
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-divider class="hidden-sm-and-up"/>
          <el-col :xs="24" :sm="10" :md="12" :lg="12" :xl="12">
            <h2>{{ item.name }}&nbsp;({{ item.code }})</h2>
            <p><span v-html="currency.symbol"></span>&nbsp;{{ convertPrice(item.price) }}</p>
            <p class="color-preview">
              {{ item.color }}&nbsp;
              <span class="hex-preview" :style="'background-color:' + item.hex"/>
            </p>

            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="120px">
              <el-form-item prop="size">
                <el-select v-model="form.size" placeholder="Выберите размер">
                  <el-option
                      v-for="size in item.sizes"
                      :key="size"
                      :label="size"
                      :value="size"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="addItem">В корзину</el-button>
              </el-form-item>
            </el-form>
            <p>Состав: 100% хлопок</p>
            <el-divider/>
            <SizeTable/>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import SizeTable from "../components/SizeTable";
import 'element-plus/lib/theme-chalk/display.css';
import router from "@/router";

export default {
  name: "Product",
  components: { SizeTable },
  props: ['currency', 'cart'],
  data() {
    return {
      item: {},
      form: {
        size: '',
      },
      rules: {
        size: [
          { required: true, message: 'Необходимо выбрать размер', trigger: 'change' },
        ],
      },
    };
  },
  async mounted() {
    const id = router.currentRoute._value.params.id;
    const res = await fetch(process.env.VUE_APP_BACKEND_HOST + '/productItem/' + id);
    this.item = await res.json();

    setTimeout(() => {
      this.$refs.carousel.next();
    }, 100);
  },
  computed: {
    getHost: () => process.env.VUE_APP_BACKEND_HOST
  },
  methods: {
    convertPrice(value) {
      if (!this.currency.exchange) return value;
      return Math.ceil(value / this.currency.exchange);
    },
    async addItem() {
      try {
        await this.$refs['form'].validate();
        this.item.size = this.form.size;
        this.cart.push(this.item);
        localStorage.setItem("cart", JSON.stringify(this.cart));

        this.$refs['form'].resetFields();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-carousel {
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

h2 {
  margin: 0;
}

.color-preview {
  display: flex;
}

.hex-preview {
  height: 20px;
  width: 20px;
}

.el-form {
  //display: flex;
}
</style>
