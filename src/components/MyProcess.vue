<template>
  <div class="myProcess" style="height: 100%">
	  <el-container style="height: 100%">
		<el-main style="height: calc(100% - 20px);box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 0px;">
			<div style="margin-left: 25%;margin-right: 25%;margin-top: 10px;">
				<el-row :span="24">
					<el-col	:span="2.5" style="mar">
						<span>计划进度：</span>
					</el-col>
					<el-col :span="2.5">
						<div class="block">
						  <el-timeline>
						    <el-timeline-item
						      v-for="(activity, index) in activities"
						      :key="index"
						      :icon="activity.icon"
						      :type="activity.type"
						      :color="activity.color"
						      :size="activity.size"
						      :timestamp="activity.timestamp">
						      {{activity.content}}
						    </el-timeline-item>
						  </el-timeline>
						</div>
					</el-col>
					<el-col	:span="1" style="margin-left: 10%;margin-right: 10%;">
						<el-divider direction="vertical"></el-divider>
					</el-col>
					<el-col	:span="2.5">
						<span>当前进度：</span>
					</el-col>
					<el-col :span="2.5">
						<div class="block">
						  <el-timeline>
						    <el-timeline-item
						      v-for="(activity, index) in activities"
						      :key="index"
						      :icon="activity.icon"
						      :type="activity.type"
						      :color="activity.color"
						      :size="activity.size"
						      :timestamp="activity.timestamp">
						      {{activity.content}}
						    </el-timeline-item>
						  </el-timeline>
						</div>
					</el-col>
				</el-row>
				<el-collapse accordion>
				  <el-collapse-item>
				    <template slot="title">
				      详细信息 Consistency<i class="header-icon el-icon-info"></i>
				    </template>
				    <div>
				    	<span>内容</span>
				    </div>
				   </el-collapse-item>
				</el-collapse>
			</div>
		</el-main>
	  </el-container>
  </div>
</template>
<script>
 export default {
  name: 'myProcess',
  data () {
    return {
    	userInfo: {},
    	token: {},
    	activities: [{
	          content: '支持使用图标',
	          timestamp: '2018-04-12',
	          size: 'large',
	          type: 'primary',
	          icon: 'el-icon-more'
	        }, {
	          content: '支持自定义颜色',
	          timestamp: '2018-04-03',
	          color: '#0bbd87'
	        }, {
	          content: '支持自定义尺寸',
	          timestamp: '2018-04-03',
	          size: 'large'
	        }, {
	          content: '默认样式的节点',
	          timestamp: '2018-04-03'
	        }]
	    };
    },
    created () {
      // 初始化页面信息
      this.pageInitial();
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
      }
  	}
}
</script>