<template>
	<div class="dayRecord" style="height: 100%">
	  <el-container style="height: 100%">
	  	<el-main style="height: calc(100% - 20px);box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 0px;">
	  		<div style="width: 80%;margin-left: 10%;margin-top: 10px;">
		  		<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 50%;margin-left: 20%;margin-top: 40px;">
				  <el-form-item label="着装费" prop="gownAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="gownAmt" v-model.number="ruleForm.gownAmt" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="饮食费" prop="footAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="footAmt" v-model.number="ruleForm.footAmt" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="住宿费" prop="houseAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="houseAmt" v-model.number="ruleForm.houseAmt" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="交通费" prop="travelAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="travelAmt" v-model.number="ruleForm.travelAmt"></el-input>
				  </el-form-item>
				  <el-divider></el-divider>
				  <el-form-item label="其他费用" prop="otherAmt" :rules="[{ required: true, trigger: 'blur', message:'金额不能为空'},{ pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确额格式,可保留两位小数' }]">
				    <el-input type="otherAmt" v-model.number="ruleForm.otherAmt"></el-input>
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
<script>
  export default {
    data() {
      return {
        ruleForm: {
          gownAmt: '0.00',
          footAmt: '0.00',
          houseAmt: '0.00',
          travelAmt: '0.00',
          otherAmt: '0.00'
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
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
		resetForm(formName) {
			this.$refs[formName].resetFields();
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
  }
</script>