<template>
	<view>
		<view class='center'>
			<map :markers="markers" latitude="39.904214" longitude="116.40741300000002"></map>
			<view class='center_text' v-if='list.userName'>
				<view>名字：{{list.userName}}</view> 
				<view>手机号：{{list.phone}}</view>
				<view>事件时间：{{eventtime}}</view>
				<view>事件地点：{{list.eventaddress}}</view>
				<view>时间名称：{{list.eventName}}</view>
				<view>事件类型：{{list.eventtype}}</view>
				<view></view>
			</view>
			<view class='center_text' v-else>
				<view>名字：{{list.eventpersonname}}</view>
				<view>手机号：{{list.eventpersonphone}}</view>
			</view>
			<view class='image_view'>
				<!-- <image :src=''></image> -->
				<image mode='aspectFit' src='../../../../static/images/1515603690-MNJAUKcXbV.jpg'></image>
				<!-- <image :src=''></image> -->
				<image mode='aspectFit' src='../../../../static/images/1533301110-VKwCNUfdxl.jpg'></image>
			</view>
			<video style="width: 100%;" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4" controls></video>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: {},
				eventtime: '',
				markers: [{
					id: 0,
					latitude: '39.904214',
					longitude: '116.407413',
					iconPath: '/static/images/dingwei6.png'
				}]
			}
		},
		onLoad: function (option) {
			console.log('返回值--》', option)
			this.list = JSON.parse(option.item)
			var datetime = JSON.parse(option.item).eventtime
			let d = new Date(datetime);
			let batchDate = d.getFullYear() + '-' + (d.getMonth() + 1) + ':' + d.getDate()
			this.eventtime = batchDate
		},
		methods: {
			
		}
	}
</script>

<style>
.center{
	margin:20rpx 40rpx;
}
map{
	width: 100%;
	height: 500rpx;
}
.center_text{
	margin:20rpx 0;
	font-size: 28rpx;
}
.image_view{
	display: flex;
	justify-content: space-around;
}
.image_view image{
	width:40vw;
	height:45vh;
}
</style>
