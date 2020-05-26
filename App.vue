<script>
	import { getClientId } from './common/common.js';
	export default {
		globalData:{
			// baseUrl:'http://zhxyapp.natapp1.cc/m.api',
			// baseUrl:'http://zhxj.natapp1.cc/m.api',
			baseUrl: 'http://119.45.118.254:8070/m.api',
			token: '' ,//登录成功token
			userInfo: {}, //用户个人信息
			sysname: '',
		},
		onLaunch: function() {
			setTimeout(()=>{
				const cid_res = plus.push.getClientInfo();
				console.log(cid_res);
				// if(cid_res.err){
					uni.showToast({
						title:'同步'+JSON.stringify(cid_res),
						icon:'none'
					});
			},2000)
			
			setTimeout(()=>{
				console.log('aaaaaa');
				plus.push.getClientInfoAsync( result => {
					uni.showToast({
						title:`异步成功${JSON.stringify(result)}`,
						icon:'none'
					});
				}, (error)=>{
					uni.showToast({
						title:`异步失败${JSON.stringify(error)}`,
						icon:'none'
					});
				});
			},5000)
			
			console.log('App Launch');
			plus.push.addEventListener("click", function(msg) {  
			plus.ui.alert("click:"+JSON.stringify(msg));  
			plus.ui.alert(msg.payload);  
			// plus.ui.alert(JSON.stringify(msg));  

			}, false);  
			// 监听在线消息事件    
			plus.push.addEventListener("receive", function(msg) {  
				// plus.ui.alert(2);  
				plus.ui.alert("recevice:"+JSON.stringify(msg))  
			}, false); 
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	image{width: 100%; height: auto;}
	.line{
		width: 100%;
		height: 20rpx;
		background: #f1f1f1;
	}
	/*每个页面公共css */
</style>
