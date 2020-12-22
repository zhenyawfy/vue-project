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
						      placeholder="选择日期">
						    </el-date-picker>
					  	</div>
		  				</el-col>
		  				<el-col :span="6" style="text-align: right;">
				  			<el-button type="primary" icon="el-icon-search">搜索</el-button>
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
			    	<el-table-column prop="date" label="日期" style="width: 10%">
				    </el-table-column>
				    <el-table-column prop="name" label="衣装费用" style="width: 14%">
				    </el-table-column>
				    <el-table-column prop="address" label="餐费" style="width: 16%">
				    </el-table-column>
				    <el-table-column prop="address" label="交通费" style="width: 16%">
				    </el-table-column>
				    <el-table-column prop="address" label="住宿费" style="width: 16%">
				    </el-table-column>
				    <el-table-column prop="address" label="其他" style="width: 16%">
				    </el-table-column>
				    <el-table-column prop="address" label="操作" style="width: 10%">
				    </el-table-column>
			     </el-table>
		  	</div>
		  	<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="dayRecordTotalPage">
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
    	totalPage: 0,
    	pageSize: 10,
    	pageNo: 1,
    	tableData: [
    		{
	          date: '2016-05-02',
	          name: '王小虎',
	          address: '上海市',
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市',
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市'
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市',
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市'
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市',
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市'
	        }
    	]
    }
  },
  created () {
      // 初始化页面信息
      this.pageInitial();
  },
  computed: {
  	dayRecordTotalPage() {
  		return this.totalPage;
  	}
  },
  methods: {
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
      },
      open() {
      	 this.$router.push("/addDayRecord");
      }

  }
}
</script>
