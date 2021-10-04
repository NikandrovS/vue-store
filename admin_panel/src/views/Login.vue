<template>
  <el-row justify="center">
    <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>Пожалуйста авторизуйтесь</span>
          </div>
        </template>
        <el-form
            :model="authForm"
            :rules="rules"
            ref="authForm"
            label-position="top"
        >
          <el-form-item label="Логин" prop="login">
            <el-input v-model="authForm.login" placeholder="Введите логин"></el-input>
          </el-form-item>
          <el-form-item label="Пароль" prop="password">
            <el-input
                placeholder="Введите пароль"
                v-model="authForm.password"
                show-password/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('authForm')">Войти</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { ElNotification } from "element-plus";
import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      authForm: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          {
            required: true,
            message: 'Введите логин для входа',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: 'Введите пароль',
            trigger: 'change'
          }
        ]
      }
    };
  },

  computed: mapGetters(['getHost']),
  methods: {
    ...mapMutations(['setAuth']),
    async submitForm(formName) {
      try {
        await this.$refs[formName].validate();
        const res = await fetch(this.getHost + '/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            login: this.authForm.login,
            password: this.authForm.password
          })
        });

        if (res.status === 401) {
          ElNotification({
            title: 'Ошибка',
            message: `Неверный логин или пароль!`,
            type: 'error',
            position: 'bottom-right'
          });
          return;
        }

        const jwt = await res.json();
        this.setAuth(true);
        localStorage.setItem('token', jwt.token);
        localStorage.setItem('user', JSON.stringify(jwt.user));
        router.push('/admin/orders');
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.el-row {
  padding-top: 150px;
}

.el-input {
  margin-bottom: 15px;
}
</style>
