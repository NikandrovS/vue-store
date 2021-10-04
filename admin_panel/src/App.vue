<template>
  <Login v-if="!getAuth"/>
  <el-container v-else>
    <el-aside class="aside">
      <AdministrationNav/>
    </el-aside>
    <el-container class="main">
      <router-view/>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import AdministrationNav from "@/components/AdministrationNav";
import Login from "@/views/Login";

export default {
  components: {
    Login, AdministrationNav
  },
  computed: {
    ...mapGetters(['getAuth'])
  },
  methods: mapMutations(['setAuth']),
  beforeMount() {
    if (localStorage.getItem('token')) this.setAuth(true);
  }
};
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}

.aside {
  width: inherit;
}

.main {
  display: flex;
  flex-direction: column;
  border-left: 1px solid #dcdfe6;
}

.el-notification .el-icon-success {
  color: var(--el-color-success);
}

.el-notification .el-icon-warning {
  color: var(--el-color-warning);
}

.upload-demo .el-upload-list__item-thumbnail {
  width: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app, .el-container {
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
