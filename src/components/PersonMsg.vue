<template>
  <div class="personMsg" style="height: 100%">
	  <el-container style="height: 100%">
		<el-main style="height: calc(100% - 20px);box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 0px;">
			<el-row :span="24" style="margin-top: 0px;">
				<el-col :span="11" style="text-align: left;">
					<span>您好，{{userInfo.name}}！</span>
				</el-col>
				<el-col :span="13" style="text-align: right;">
					<el-button round>修改信息</el-button>
				</el-col>
			</el-row>
			<div style="width: 50%;margin-left: 25%;">
				<el-row :span="24" style="margin-top: 60px;">
					<el-col :span="11" style="text-align: right;margin-right: 40px;">
						<span class="el-icon-user">昵称:</span>
					</el-col>
					<el-col :span="10" style="text-align: left;">
						<span>{{userInfo.loginName}}</span>
					</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row :span="24">
					<el-col :span="11" style="text-align: right;margin-right: 40px;">
						<span :class="sexInfoMsg">性别:</span>
					</el-col>
					<el-col :span="10" style="text-align: left;">
						<span>{{userInfo.sex}}</span>
					</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row :span="24">
					<el-col :span="11" style="text-align: right;margin-right: 40px;">
						<span class="el-icon-message">电子邮件:</span>
					</el-col>
					<el-col :span="10" style="text-align: left;">
						<span>{{userInfo.email}}</span>
					</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row :span="24">
					<el-col :span="11" style="text-align: right;margin-right: 40px;">
						<span class="el-icon-map-location">地址:</span>
					</el-col>
					<el-col :span="10" style="text-align: left;">
						<span>{{userInfo.address}}</span>
					</el-col>
				</el-row>
				<el-divider></el-divider>
			</div>
		</el-main>
	  </el-container>
  </div>
</template>
<script>
 export default {
  name: 'PersonMsg',
  data () {
    return {
    	sexIcon : 'el-icon-female',
    	userInfo: {},
    	token: {}
    }
  },
  created () {
      // 刷新后loading应消失
      this.$store.dispatch("setTableLoading", false);
      // 初始化页面信息
      this.pageInitial();
  },
  computed: {
  	sexInfoMsg: function () {
  		if (this.userInfo.code === "200") {
  			this.sexIcon = "el-icon-male";
  		}
  		return this.sexIcon;
	  }
  },
  methods: {
  	  // 通过token获取用户信息
      pageInitial() {
        var tokenFlag = sessionStorage.getItem("token");
        if (tokenFlag) {
          this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          this.token = JSON.parse(tokenFlag);
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
}
</script>
<style>
  .el-header {
    color: #333;
    line-height: 20px;
  }
</style>