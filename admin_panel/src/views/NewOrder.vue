<template>
  <Header v-bind:title="'Оформление заказа'"/>
  <el-main>
    <el-form label-position="top">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="ФИО" :required="getOrderForm.name.required">
            <el-input v-model="nameInput"/>
          </el-form-item>
          <el-form-item label="@Instagram">
            <el-input v-model="instagramInput"/>
          </el-form-item>
          <el-form-item label="Телефон" :required="getOrderForm.phone.required">
            <el-input type="phone" v-model.number="phoneInput" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="emailInput"/>
          </el-form-item>

          <el-form-item label="Тип доставки" :required="getOrderForm.delivery.required">
            <el-radio-group v-model="deliveryInput" size="small" @change="value => setDeliveryType(value)">
              <el-radio v-for="item in deliveryTypes" :label="item.type" border>{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Улица, дом, квартира" :required="getOrderForm.address.required">
            <el-input v-model="addressInput"/>
          </el-form-item>
          <el-form-item label="Город" :required="getOrderForm.city.required">
            <el-input v-model="cityInput"/>
          </el-form-item>
          <el-form-item label="Страна" :required="getOrderForm.country.required">
            <el-input v-model="countryInput"/>
          </el-form-item>
          <el-form-item label="Индекс" :required="getOrderForm.postcode.required">
            <el-input v-model="postcodeInput"/>
          </el-form-item>

          <el-form-item label="Комментарий к заказу">
            <el-input type="textarea" v-model="descInput"></el-input>
          </el-form-item>
        </el-col>
        <el-divider class="hidden-md-only hidden-lg-only hidden-xl-only"/>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <ItemSelect/>
          <el-divider/>
          <el-card v-if="!getOrderForm.items_in_cart.length">Необходимо добавить товары <i class="el-icon-goods"></i>
          </el-card>
          <ItemCard v-else v-for="(item, index) in getOrderForm.items_in_cart" v-bind:data="{item, index}"/>
        </el-col>
        <el-divider></el-divider>
        <el-col :span="24">
          <el-row align="middle">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item class="discount-toggle">
                <el-input-number
                    v-if="getPercentage"
                    v-model="discountInput"
                    :step="5"
                    :min="0"
                    :max="100"
                />
                <el-input-number
                    v-else
                    v-model="discountInput"
                    :step="100"
                    :min="0"
                    :max="getOrderForm.total"
                />
                <el-switch
                    v-model="percentageInput"
                    active-text="Скидка в процентах"
                    inactive-text="Скидка в рублях"
                    inactive-color="#409EFF"
                >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item class="discount-description">
                <div v-if="getDiscount">
                  <span v-if="getPercentage">Скидка {{ getDiscount }} %.</span>
                  <span v-else>Скидка {{ getDiscount }} рублей.</span>
                </div>
                <span v-if="getPercentage"><b>Итого</b> {{ getOrderForm.total * (100 - getDiscount) / 100 }} рублей.</span>
                <span v-else><b>Итого</b> {{ getOrderForm.total - getDiscount }} рублей.</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item>
                <el-button v-if="getOrderEditState" type="primary" @click="createOrder(true)">Сохранить</el-button>
                <el-button v-if="getOrderEditState" type="info" @click="setEditState()">Отмена</el-button>
                <el-button v-else type="primary" @click="createOrder()">Создать заказ</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Header from "@/components/Header";
import ItemSelect from "@/components/NewOrder/ItemSelect";
import ItemCard from "@/components/NewOrder/ItemCard";
import deliveryTypes from "@/helpers/delivery_types"
import 'element-plus/lib/theme-chalk/display.css';

export default {
  components: { Header, ItemSelect, ItemCard },
  beforeUnmount() {
    this.clearOrderForm()
  },
  methods: {
    ...mapMutations(['updateOrderForm', 'updateDiscount', 'updatePercentage', 'setEditState']),
    ...mapActions(['setDeliveryType', 'createOrder', 'clearOrderForm'])
  },
  computed: {
    ...mapGetters(['getOrderForm', 'getPercentage', 'getDiscount', 'getOrderEditState']),
    deliveryTypes: {
      get: () => deliveryTypes.types,
    },
    discountInput: {
      get() {
        return this.getDiscount;
      },
      set(value) {
        this.updateDiscount(value);
      }
    },
    percentageInput: {
      get() {
        return this.getPercentage;
      },
      set() {
        this.updatePercentage();
      }
    },
    nameInput: {
      get() {
        return this.getOrderForm.name.value;
      },
      set(value) {
        this.updateOrderForm(["name", value]);
      }
    },
    instagramInput: {
      get() {
        return this.getOrderForm.instagram.value;
      },
      set(value) {
        this.updateOrderForm(["instagram", value]);
      }
    },
    phoneInput: {
      get() {
        return this.getOrderForm.phone.value;
      },
      set(value) {
        this.updateOrderForm(["phone", value]);
      }
    },
    emailInput: {
      get() {
        return this.getOrderForm.email.value;
      },
      set(value) {
        this.updateOrderForm(["email", value]);
      }
    },
    addressInput: {
      get() {
        return this.getOrderForm.address.value;
      },
      set(value) {
        this.updateOrderForm(["address", value]);
      }
    },
    cityInput: {
      get() {
        return this.getOrderForm.city.value;
      },
      set(value) {
        this.updateOrderForm(["city", value]);
      }
    },
    countryInput: {
      get() {
        return this.getOrderForm.country.value;
      },
      set(value) {
        this.updateOrderForm(["country", value]);
      }
    },
    postcodeInput: {
      get() {
        return this.getOrderForm.postcode.value;
      },
      set(value) {
        this.updateOrderForm(["postcode", value]);
      }
    },
    deliveryInput: {
      get() {
        return this.getOrderForm.delivery.value;
      },
      set(value) {
        this.updateOrderForm(["delivery", value]);
      }
    },
    descInput: {
      get() {
        return this.getOrderForm.desc.value;
      },
      set(value) {
        this.updateOrderForm(["desc", value]);
      }
    }
  }
};
</script>
<style>
.el-main {
  border-top: 1px solid #dcdfe6;
  padding-top: 0;
}
.el-radio {
  margin: 0 0 10px;
}
.discount-toggle .el-form-item__content, .discount-description .el-form-item__content {
  display: flex;
  flex-direction: column;
}
.el-input-number {
  margin-bottom: 20px;
}
.discount-toggle .el-form-item__content {
  align-items: center;
}
.discount-description .el-form-item__content {
  text-align: right;
}
</style>
