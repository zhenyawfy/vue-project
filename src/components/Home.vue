<template>
  <div class="home" style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="text-align: right; background-color: #545c64; font-size: 12px">
        <el-row :span="24">
          <el-col :span="6">
            <img style="height: 30px;margin-top: 15px;margin-right: 100%;" src="./../assets/logo.jpg">
          </el-col>
          <el-col :span="12">
            <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              router
              class="home-menu"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="/personMsg" style="margin-left: 15%;">个人信息</el-menu-item>
              <el-menu-item index="/dayRecord">消费记录</el-menu-item>
              <el-menu-item index="">我的进度</el-menu-item>
              <el-menu-item index="">攀岩足迹</el-menu-item>
              <el-menu-item index="">统计</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="6">
            <span>{{userInfo.code}}</span>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main" v-loading="mainLoading" >
        <div class="content-wrapper" style="height: calc(100% - 2px);">
          <router-view :key="$route.path"></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: "/personMsg",
        userInfo: {}
      };
    },
    created() {
      // 初始化页面信息
      this.pageInitial();
      // 设置菜单栏
      this.setmenu();
    },
    computed: {
      mainLoading(val) {
        return this.$store.state.loading.mainLoading;
      },
    },
    methods: {
      // 根据url确定菜单栏
      setmenu() {
        // 获取到匹配的路由
        const { matched } = this.$router.history.current;
        var activeIndexPath = matched[0].path 
        if (matched[0].path === '/home') {
          activeIndexPath = "/personMsg";
          this.$router.push(activeIndexPath);
        }
        // 确定一级菜单
        this.activeIndex = activeIndexPath;
      },
      // 通过token获取用户信息
      pageInitial() {
        var token = sessionStorage.getItem("userInfo");
        if (token) {
          this.userInfo = JSON.parse(token);
        } else {
          const obj = {
            path: this.$route.path,
            query: this.$route.query,
          };
          // token不存在跳回登录页
          this.$router.push("/");
        }
      }
    }
  };
</script>

<style>
  .el-header {
    color: #333;
    line-height: 60px;
  }
  .home-menu {
    margin-right: 0px;
  }
  .home-menu-item {
    margin-left: 10%;
  }
</style>