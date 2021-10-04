<template>
  <el-row class="tac">
    <el-col>
      <el-header>
        <p style="font-size: var(--el-font-size-large);">
          <span class="hidden-xs-only">My Store &nbsp;</span>
          &#9884;
        </p>
      </el-header>


      <div class="user">
        <el-avatar>{{ getInitials[0] }}{{ getInitials[1] }}</el-avatar>
        <p class="hidden-xs-only">{{ getUser }}</p>
        <el-button @click="logout" class="hidden-xs-only" size="small" type="warning" plain>logout</el-button>
        <el-button
            @click="logout"
            icon="el-icon-lock"
            size="mini"
            class="mobile-logout hidden-sm-and-up"
        />
      </div>

      <el-menu class="nav" :default-active="activeIndex" :collapse="collapse">
        <el-menu-item class="nav__item" index="1">
          <router-link to="/admin/orders">
            <i class="el-icon-s-shop nav__icon"></i>
            <span>Просмотр заказов</span>
          </router-link>
        </el-menu-item>
        <el-menu-item class="nav__item" index="2">
          <router-link to="/admin/newOrder">
            <i class="el-icon-goods nav__icon"></i>
            <span>Оформление заказа</span>
          </router-link>
        </el-menu-item>
        <el-menu-item class="nav__item" index="3">
          <router-link to="/admin/products">
            <i class="el-icon-document nav__icon"></i>
            <span>Все товары</span>
          </router-link>
        </el-menu-item>
        <el-menu-item class="nav__item" index="4">
          <router-link to="/admin/newProduct">
            <i class="el-icon-circle-plus-outline nav__icon"></i>
            <span>Добавить товар</span>
          </router-link>
        </el-menu-item>
        <el-menu-item class="nav__item" index="5">
          <router-link to="/admin/colors">
            <i class="el-icon-s-open nav__icon"></i>
            <span>Доступные цвета</span>
          </router-link>
        </el-menu-item>
        <el-menu-item class="nav__item" index="6">
          <router-link to="/admin/sizes">
            <i class="el-icon-s-operation nav__icon"></i>
            <span>Доступные размеры</span>
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations } from 'vuex';
import menuList from "@/helpers/menuList";
import 'element-plus/lib/theme-chalk/display.css';

export default {
  name: "AdministrationNav",
  data() {
    return {
      user: "",
      activeIndex: "1",
      collapse: false
    };
  },
  mounted() {
    const path = window.location.pathname.split('/').reverse()[0];
    const menu = menuList.find(item => item.name === path);
    if (menu) this.activeIndex = menu.index;

    this.onResize();
  },
  computed: {
    getUser: function () {
      return JSON.parse(localStorage.getItem('user')).name;
    },
    getInitials: function () {
      const [name, surname] = JSON.parse(localStorage.getItem('user')).name.split(' ').map(word => word[0]);
      return [name, surname];
    }
  },
  methods: {
    ...mapMutations(['setAuth']),
    logout() {
      localStorage.removeItem('token');
      this.setAuth(false);
      this.$router.push('/login');
    },
    onResize() {
      this.collapse = window.innerWidth < 768;
    }
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="scss" scoped>
.tac {
  height: 100%;
}

.user {
  padding: 20px 0 20px 0;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-logout {
  margin-top: 15px;
  margin-left: 0;
}

.el-header {
  display: flex;
  align-items: center;

  & p {
    margin: auto;
  }
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 0;

  &__item {
    width: 100%;

    & a {
      display: block;
      text-align: left;
      text-decoration: none;

      &:active {
        color: inherit;
      }

      &:visited {
        color: inherit;
      }
    }
  }
}

.el-menu-item.is-active i {
  color: var(--el-color-primary);
}
</style>
