<template>
  <div class="personMsg" style="height: 100%">
	  <el-container style="height: 100%">
		<el-main style="height: calc(100% - 20px);box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 0px;">
			<el-row :span="24" style="margin-top: 0px;">
				<el-col :span="11" style="text-align: left;">
					<span>您好，{{userInfo.name}}！</span>
				</el-col>
				<el-col :span="13" style="text-align: right;">
					<el-button round @click="editAssets">修改金额</el-button>
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
						<el-tooltip class="item" effect="dark" content="当前/目标金额" placement="left">
					      <span class="el-icon-info">保障金额:</span>
					    </el-tooltip>
					</el-col>
					<el-col :span="10" style="text-align: left;">
						<span>{{userassets.securityAmt}}/{{userassets.goalSecurityAmt}}</span>
					</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row :span="24">
					<el-col :span="11" style="text-align: right;margin-right: 40px;">
						<el-tooltip class="item" effect="dark" content="当前/目标金额" placement="left">
					      <span class="el-icon-info">安全金额:</span>
					    </el-tooltip>
					</el-col>
					<el-col :span="10" style="text-align: left;">
						<span>{{userassets.conservativeAmt}}/{{userassets.goalConservativeAmt}}</span>
					</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row :span="24">
					<el-col :span="11" style="text-align: right;margin-right: 40px;">
						<el-tooltip class="item" effect="dark" content="系统自动计算" placement="left">
					      <span class="el-icon-info">自由金额:</span>
					    </el-tooltip>
					</el-col>
					<el-col :span="10" style="text-align: left;">
						<span>{{userassets.investmentAmt}}</span>
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
    	token: {},
    	userassets:{}
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
            let that = this;
	        this.$axios.post('/financeManage/queryAssets', {
	          userId: this.userInfo.id
	        })
	        .then(function (response) {
	          if (response.data.code === '200') {
	              that.userassets = response.data.data;
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
        } else {
        	// token不存在跳回登录页
        	this.$router.push("/");
        }
     },
     editAssets() {
      	 this.$router.push("/editAssets");
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