<template>
  <div class="myProcess" style="height: 100%">
	  <el-container style="height: 100%">
		<el-main style="height: calc(100% - 20px);box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top: 0px;">
			 <div style="margin-left: 25%;margin-right: 25%;margin-top: 10px;">
				 <div style="text-align: left;">
				 	<span>我的足迹>>黑铁级</span>
				 </div>
				 <div class="timeLine" style="overflow: hidden;">
			        <div class="ul_box" style="height: 100px;width: 100%;">
			            <ul class="my_timeline" ref="mytimeline">
			                <li class="my_timeline_item" v-for="(item,index) in activities" :key="index">
			                    <!--事件-->
			                    <div class="my_timeline_item_content" :style="{ fontSize: '18px'}">
			                        {{item.content}}
			                    </div>
			                    <!--圈圈节点-->
			                    <div class="my_timeline_node" :style = " {backgroundColor: item.color, width: item.size + 'px', height: item.size + 'px'}"></div>
			                    <!--线-->
			                    <div class="my_timeline_item_line" v-if="index!=activities.length-1"></div>
			                    <!--时间-->
			                    <div class="my_timeline_item_time" :style="{ fontSize: '18px'}">
			                        {{item.timestamp}}
			                    </div>
			                </li>
			            </ul>
			        </div>
			    </div>
			    <div style="text-align: left;margin-top: 50px;">
				 	<span>我的足迹>>青铜级</span>
				 </div>
				 <div class="timeLine" style="overflow: hidden;">
			        <div class="ul_box" style="height: 100px;width: 100%;">
			            <ul class="my_timeline" ref="mytimeline">
			                <li class="my_timeline_item" v-for="(item,index) in activities" :key="index">
			                    <!--事件-->
			                    <div class="my_timeline_item_content" :style="{ fontSize: '18px'}">
			                        {{item.content}}
			                    </div>
			                    <!--圈圈节点-->
			                    <div class="my_timeline_node" :style = " {backgroundColor: item.color, width: item.size + 'px', height: item.size + 'px'}"></div>
			                    <!--线-->
			                    <div class="my_timeline_item_line" v-if="index!=activities.length-1"></div>
			                    <!--时间-->
			                    <div class="my_timeline_item_time" :style="{ fontSize: '18px'}">
			                        {{item.timestamp}}
			                    </div>
			                </li>
			            </ul>
			        </div>
			    </div>
			    <div style="text-align: left;margin-top: 50px;">
				 	<span>我的足迹>>白银级</span>
				 </div>
				 <div class="timeLine" style="overflow: hidden;">
			        <div class="ul_box" style="height: 100px;width: 100%;">
			            <ul class="my_timeline" ref="mytimeline">
			                <li class="my_timeline_item" v-for="(item,index) in activities" :key="index">
			                    <!--事件-->
			                    <div class="my_timeline_item_content" :style="{ fontSize: '18px'}">
			                        {{item.content}}
			                    </div>
			                    <!--圈圈节点-->
			                    <div class="my_timeline_node" :style = " {backgroundColor: item.color, width: item.size + 'px', height: item.size + 'px'}"></div>
			                    <!--线-->
			                    <div class="my_timeline_item_line" v-if="index!=activities.length-1"></div>
			                    <!--时间-->
			                    <div class="my_timeline_item_time" :style="{ fontSize: '18px'}">
			                        {{item.timestamp}}
			                    </div>
			                </li>
			            </ul>
			        </div>
			    </div>
			    <div style="text-align: left;margin-top: 50px;">
				 	<span>我的足迹>>黄金级</span>
				 </div>
				 <div class="timeLine" style="overflow: hidden;">
			        <div class="ul_box" style="height: 100px;width: 100%;">
			            <ul class="my_timeline" ref="mytimeline">
			                <li class="my_timeline_item" v-for="(item,index) in activities" :key="index">
			                    <!--事件-->
			                    <div class="my_timeline_item_content" :style="{ fontSize: '18px'}">
			                        {{item.content}}
			                    </div>
			                    <!--圈圈节点-->
			                    <div class="my_timeline_node" :style = " {backgroundColor: item.color, width: item.size + 'px', height: item.size + 'px'}"></div>
			                    <!--线-->
			                    <div class="my_timeline_item_line" v-if="index!=activities.length-1"></div>
			                    <!--时间-->
			                    <div class="my_timeline_item_time" :style="{ fontSize: '18px'}">
			                        {{item.timestamp}}
			                    </div>
			                </li>
			            </ul>
			        </div>
			    </div>
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
    	activities: [{
	          content: '支持使用图标',
	          timestamp: '2018-04-12',
	          size: '20',
	          type: 'primary',
	          color: '#7fff00',
	          icon: 'el-icon-more',
	          flag: '0'
	        }, {
	          content: '支持自定义颜色',
	          timestamp: '2018-04-03',
	          color: '#7fff00',
	          size: '20',
	          icon: 'el-icon-more',
	          flag: '0'
	        }, {
	          content: '支持自定义尺寸',
	          timestamp: '2018-04-03',
	          color: '#7fff00',
	          size: '20',
	          icon: 'el-icon-more',
	          flag: '0'
	        }, {
	          content: '默认样式的节点',
	          timestamp: '2018-04-03',
	          size: '20',
	          icon: 'el-icon-more',
	          flag: '0'
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
<style>
.ul_box {
    width: 100%;
    height: 60px;
    display: inline-block;
    float: left;
    margin-top: 2px;
    overflow: hidden;
}
.my_timeline_item {
    display: inline-block;
    width: 150px;
}
.my_timeline_node {
    box-sizing: border-box;
    border-radius: 100%;
    background-color: gray;
}
.my_timeline_item_line {
    width: 100%;
    height: 10px;
    margin: -14px 0 0 20px;
    border-top: 2px solid #E4E7ED;
    border-left: none;
}
.my_timeline_item_line.lineActive {
    display: none;
}
.my_timeline_item_time {
    text-align: left;
    margin: 10px 0 0 -40px;
}
.my_timeline_item_content {
    text-align: left;
    margin: 0 0 10px -40px;
}
</style>