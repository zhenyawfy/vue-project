<template>
	<div class="dayRecord" style="height: 100%">
	  <el-container style="height: 100%">
	  	<el-main style="height: calc(100% - 20px);box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 0px;">
		  	<el-row :span="24">
		  		<el-col :span="7" style="text-align: right;margin-top: 8px;margin-right: 20px;">
		  			<span>查询区间:</span>
		  		</el-col>
		  		<el-col :span="12" style="text-align: left;margin-right: 10px;">
		  			<el-row :span="20">
		  				<el-col :span="6">
		  					<div class="block">
							    <el-date-picker
							      v-model="startDate"
							      type="date"
							      format="yyyy-MM-dd"
							      value-format="yyyyMMdd"
							      placeholder="选择日期">
							    </el-date-picker>
						  	</div>
		  				</el-col>
		  				<el-col :span="2" style="text-align: center;margin-top: 8px;margin-left: 40px;">
		  				  <span>-</span>
		  				</el-col>
		  				<el-col :span="6" style="text-align: left;">
		  				  <div class="block">
						    <el-date-picker
						      v-model="endDate"
						      type="date"
						      format="yyyy-MM-dd"
						      value-format="yyyyMMdd"
						      placeholder="选择日期">
						    </el-date-picker>
					  	</div>
		  				</el-col>
		  				<el-col :span="6" style="text-align: right;">
				  			<el-button type="primary" icon="el-icon-search" @click="handleCurrentChange">搜索</el-button>
				  		</el-col>
		  			</el-row>
		  		</el-col>
		  		<el-col :span="4" style="text-align: right;">
		  			<el-button type="text" @click="open">新增记录</el-button>
		  		</el-col>
		  	</el-row>
		  	<div style="width: 80%;height: 82%;margin-left: 10%;margin-top: 10px;">
		  		<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    	<el-table-column prop="recordDay" label="日期" style="width: 10%">
				    </el-table-column>
				    <el-table-column prop="grownAmt" label="衣装费用" style="width: 14%">
				    </el-table-column>
				    <el-table-column prop="foodAmt" label="餐费" style="width: 16%">
				    </el-table-column>
				    <el-table-column prop="travelAmt" label="交通费" style="width: 16%">
				    </el-table-column>
				    <el-table-column prop="houseAmt" label="住宿费" style="width: 16%">
				    </el-table-column>
				    <el-table-column prop="otherAmt" label="其他" style="width: 16%">
				    </el-table-column>
				    <el-table-column label="操作" style="width: 16%">
				    	<template slot-scope="scope">
				    		<el-button type="text" @click="deleteDayRecord(scope.row.recordDay)">删除</el-button>
				    	</template>
				    </el-table-column>
			     </el-table>
		  	</div>
		  	<el-pagination
			  background
			  layout="prev, pager, next"
			  @current-change="handleCurrentChange"
      		  :current-page.sync="pageNo"
			  :page-size="pageSize"
			  :total="totalPage">
			</el-pagination>
		</el-main>
	  </el-container>
  	</div>
</template>
<script>
 export default {
  name: 'dayRecord',
  data () {
    return {
    	startDate: '',
    	endDate: '',
    	totalPage: 20,
    	pageSize: 10,
    	pageNo: 1,
    	userInfo:{},
    	token: {},
    	tableData: [
    	]
    }
  },
  created () {
      // 初始化页面信息
      this.pageInitial();
      // 初始化table数据
      this.handleCurrentChange();
  },
  computed: {
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
      },
      open() {
      	 this.$router.push("/addDayRecord");
      },
      handleCurrentChange() {
      	let that = this;
        this.$axios.post('/financeManage/queryPageInfo', {
          startDate: this.startDate,
          endDate: this.endDate,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          userId: this.userInfo.id
        })
        .then(function (response) {
          if (response.data.code === '200') {
              that.tableData = response.data.data.list;
              that.pageNo = response.data.data.pageNo;
              that.pageSize = response.data.data.pageSize;
              that.totalPage = response.data.data.toatlPage;
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
      },
      deleteDayRecord(val) {
      	let that = this;
        this.$axios.post('/financeManage/deleteDayRecord', {
          recordDay: val,
          userId: this.userInfo.id
        })
        .then(function (response) {
          if (response.data.code === '200') {
              that.$alert('删除成功！', '提示', {
		          confirmButtonText: '确定',
		          callback: action => {
		            location.reload();
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
