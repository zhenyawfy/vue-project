<template>
  <div class="hello">
    <img src="./../assets/logo.jpg">
    <h1>{{ msg }}</h1>
    <div class="login_form">
      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="loginName">
      <input type="text"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="pwd">
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="logining">登录</el-button>
      <div style="margin-top: 10px">
        <span style="float: right;color: #A9A9AB">忘记密码？</span>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your App',
      loginName: '',
      pwd: ''
    }
  },
  created () {
      // 刷新后loading应消失
      this.$store.dispatch("setLoginLoading", false);
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).loginName){
        this.loginName = JSON.parse( localStorage.getItem('user')).loginName;
        this.pwd = JSON.parse( localStorage.getItem('user')).pwd;
      }
    },
    computed: {
      logining() {
        return this.$store.state.loading.loginLoading;
      }
    },
    methods: {
      login() {
        if (!this.loginName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.pwd) {
          this.$message.error('请输入密码');
          return;
        }
        let that = this;
        this.$axios.post('/financeManage/userLogin', {
          loginName: this.loginName,
          pwd: this.pwd
        })
        .then(function (response) {
          if (response.data.code === '200') {
              console.log(response.data.data.user);
              sessionStorage.setItem("userInfo", JSON.stringify(response.data.data.user));
              sessionStorage.setItem("token", JSON.stringify(response.data.data.token));
              console.log(response);
              that.$router.push({path:'/home'});
          } else {
              that.$alert(response.data.msg, '提示', {
                confirmButtonText: '确定'
              });
          }
          
        })
        .catch(function (error) {
         that.$alert("服务器内部错误！请联系开发人员。", '提示', {
            confirmButtonText: '确定'
          });
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-top: 60px;
}
h1 {
  font-weight: normal;
}
.login_form {
    padding-top: 1%;
    padding-left: 35%;
    padding-right: 35%;
  }
  .qxs-ic_user {
    background: url("../assets/login/ic_user.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
  }
  .qxs-ic_password {
    background: url("../assets/login/ic_password.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
    margin-bottom: 20px;
  }
  .login_btn {
    width: 100%;
    font-size: 16px;
    background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
}
</style>
