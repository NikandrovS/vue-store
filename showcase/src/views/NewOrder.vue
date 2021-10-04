<template>
  <el-row v-if="message" justify="center">
    <el-col :span="12">
      <p class="message">{{ this.message }}</p>
    </el-col>
  </el-row>
  <el-row v-else justify="center">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <el-form :model="orderForm" :rules="rules" ref="orderForm" label-width="120px" class="demo-orderForm">
        <el-form-item label="Полное имя" prop="name">
          <el-input v-model="orderForm.name" placeholder="Ф.И.О."></el-input>
        </el-form-item>
        <el-form-item label="Телефон" prop="phone">
          <el-input v-model="orderForm.phone" placeholder="+7 999 134 18 18"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="orderForm.email" placeholder="Email"></el-input>
        </el-form-item>

        <el-form-item label="Тип доставки" prop="deliveryType" class="delivery-types">
          <el-radio-group v-model="orderForm.deliveryType">
            <el-row :gutter="20">
              <el-col v-for="item in deliveryTypes" :xs="24" :sm="24" :md="12" :lg="8" :xl="4">
                <el-radio :label="item.type" border>{{ item.label }}</el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Адрес доставки" prop="address">
          <el-input v-model="orderForm.address" placeholder="улица Пионерская, д. 12, кв. 602"/>
        </el-form-item>
        <el-form-item label="Город" prop="city">
          <el-input v-model="orderForm.city" placeholder="Москва"/>
        </el-form-item>
        <el-form-item label="Страна" prop="country">
          <el-input v-model="orderForm.country" placeholder="Россия"/>
        </el-form-item>
        <el-form-item label="Индекс" prop="postcode">
          <el-input v-model="orderForm.postcode" placeholder="123123"/>
        </el-form-item>
        <el-form-item label="Ваши пожелания" prop="wishes">
          <el-input type="textarea" v-model="orderForm.wishes"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('orderForm')">Оформить заказ</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import deliveryTypes from "@/helpers/delivery_types";

export default {
  name: "NewOrder",
  computed: {
    deliveryTypes: () => deliveryTypes,
  },
  props: ['cart'],
  mounted() {
    if (!this.cart.length) this.$router.push('/');
  },
  methods: {
    async submitForm() {
      try {
        await this.$refs['orderForm'].validate();

        const data = {
          items: this.cart,
          name: this.orderForm.name,
          phone: this.orderForm.phone,
          email: this.orderForm.email,
          address: this.orderForm.address,
          city: this.orderForm.city,
          country: this.orderForm.country,
          postcode: this.orderForm.postcode,
          delivery: this.orderForm.deliveryType,
          wishes: this.orderForm.wishes,
          discount: 0,
          percentage: false,
        };

        const url = process.env.VUE_APP_BACKEND_HOST + '/newOrder';
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.status === 200) {
          const createdItem = await res.json();
          this.$refs['orderForm'].resetFields();
          this.cart.splice(0, this.cart.length);
          this.message = `Заказ создан. Номер заказа #${ createdItem.order }`;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      message: '',
      orderForm: {
        name: '',
        phone: '',
        email: '',

        deliveryType: '',

        address: '',
        city: '',
        country: '',
        postcode: '',
        wishes: '',
      },
      rules: {
        name: [
          { required: true, message: 'Заполните это поле', trigger: 'blur' },
          { min: 3, message: 'Слишком короткое значение', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: 'Укажите номер телефона', trigger: 'blur' },
          { min: 11, max: 15, message: 'Длина должна быть 11 - 15 символов', trigger: 'blur' },
        ],
        deliveryType: [
          { required: true, message: 'Выберите тип доставки', trigger: 'change' },
        ],
        address: [
          { required: true, message: 'Укажите адрес', trigger: 'change' },
          { min: 10, message: 'Слишком короткое значение', trigger: 'blur' },
        ],

      },
    };
  },
};
</script>

<style scoped>
.message {
  text-align: center;
}

.el-radio.is-bordered + .el-radio.is-bordered {
  margin: 0;
}

.el-radio-group {
  width: 100%;
}

.el-radio {
  margin: 0 0 5px;
  width: 100%;
}
</style>
