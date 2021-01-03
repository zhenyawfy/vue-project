<template>
	<div class="dayRecord" style="height: 100%">
	  <el-container style="height: 100%">
	  	<el-main style="height: calc(100% - 20px);box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 0px;">
	  		<div style="width: 80%;margin-left: 10%;margin-top: 10px;">
		  		<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 50%;margin-left: 20%;margin-top: 40px;">
		  		  <el-divider></el-divider>
				  <el-form-item label="月消费额:" prop="monthUseAmt" :rules="[{ pattern: /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})(\.)?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="monthUseAmt" v-model="ruleForm.monthUseAmt" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="月余额:" prop="monthSurplusAmt" :rules="[{ pattern: /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})(\.)?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="monthSurplusAmt" v-model="ruleForm.monthSurplusAmt" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="保障月数:" prop="securityMonth" :rules="[{ pattern: /(^(([1-9]{1}\d*))?$)/, message: '请输入正确数字' }]">
				    <el-input type="securityMonth" v-model="ruleForm.securityMonth" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="计划保障金:" prop="goalSecurityAmt" :rules="[{ required: true, trigger: 'blur', message:'保障金额不能为空'},{ pattern: /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$)/, message: '请输入正确格式,可保留两位小数' }]">
				    <el-input type="goalSecurityAmt" v-model="ruleForm.goalSecurityAmt"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 100px;">提交</el-button>
				    <el-button @click="resetForm('ruleForm')" style="margin-right: 100px;">重置</el-button>
				  </el-form-item>
				</el-form>
			</div>
	  	</el-main>
	  </el-container>
  	</div>
</template>
<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
</style>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          monthUseAmt: '0.00',
          monthSurplusAmt: '0.00',
          securityMonth: 0,
          goalSecurityAmt: '0.00'
        }
      };
    },
    created() {
      // 初始化页面信息
      this.pageInitial();
    },
    computed: {
    },
    methods: {
    	submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	let that = this;
	            this.$axios.post('/financeManage/addAssets', {
		          monthUseAmt: this.ruleForm.monthUseAmt,
		          monthSurplusAmt: this.ruleForm.monthSurplusAmt,
		          securityMonth: this.ruleForm.securityMonth,
		          goalSecurityAmt: this.ruleForm.goalSecurityAmt,
		          userId: this.userInfo.id
		        })
		        .then(function (response) {
		          if (response.data.code === '200') {
		              that.$alert('保存成功！', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            that.$router.push("/personMsg");
				          }
				        });
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
	            return false;
	          }
	        });
	      },
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
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