<template>
	<div class="dayRecord" style="height: 100%">
	  <el-container style="height: 100%">
	  	<el-main style="height: calc(100% - 20px);box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 0px;">
	  		<div style="width: 80%;margin-left: 10%;margin-top: 10px;">
		  		<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 50%;margin-left: 20%;margin-top: 40px;">
		  		  <el-form-item label="记录日期:" prop="recordDay" :rules="[{ required: true, trigger: 'blur', message:'日期不能为空'}]">
		  		    <el-date-picker v-model="ruleForm.recordDay" format="yyyy-MM-dd" value-format="yyyyMMdd" type="date" size="large" placeholder="选择日期"></el-date-picker>
		  		  </el-form-item>
		  		  <el-divider></el-divider>
				  <el-form-item label="着装费:" prop="gownAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})(\.)?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="gownAmt" v-model="ruleForm.gownAmt" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="饮食费:" prop="footAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})(\.)?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="footAmt" v-model="ruleForm.footAmt" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="住宿费:" prop="houseAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})(\.)?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="houseAmt" v-model="ruleForm.houseAmt" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="交通费:" prop="travelAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})(\.)?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="travelAmt" v-model="ruleForm.travelAmt"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="其他费用:" prop="otherAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})(\.)?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="otherAmt" v-model="ruleForm.otherAmt"></el-input>
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
          gownAmt: '0.00',
          footAmt: '0.00',
          houseAmt: '0.00',
          travelAmt: '0.00',
          otherAmt: '0.00',
          recordDay: ''
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
	            this.$axios.post('/financeManage/addDayRecord', {
		          grownAmt: this.ruleForm.gownAmt,
		          foodAmt: this.ruleForm.footAmt,
		          houseAmt: this.ruleForm.houseAmt,
		          travelAmt: this.ruleForm.travelAmt,
		          otherAmt: this.ruleForm.otherAmt,
		          recordDay: this.ruleForm.recordDay,
		          userId: this.userInfo.id
		        })
		        .then(function (response) {
		          if (response.data.code === '200') {
		              that.$alert('保存成功！', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            that.$router.push("/dayRecord");
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