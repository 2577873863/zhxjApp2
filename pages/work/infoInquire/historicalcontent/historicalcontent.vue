<template>
	<view>
		<view class='center'>
			<map :markers="markers" :latitude="list.latitude" longitude="list.longitude"></map>
			<view class='center_text'>
				<!-- <view>名字：{{list.userName}}</view> -->
				<view>手机号：{{list.phone}}</view>
				<view>事件时间：{{eventtime}}</view>
				<view>事件地点：{{list.eventaddress}}</view>
				<view>时间名称：{{list.eventName}}</view>
				<view>事件类型：{{list.eventtype}}</view>
				<view></view>
			</view>
			<view class='image_view'>
				<!-- <image :src=''></image> -->
				<image mode='aspectFit' src='../../../../static/images/defaultpic.gif'></image>
				<!-- <image :src=''></image> -->
				<image mode='aspectFit' src='../../../../static/images/defaultpic.gif'></image>
			</view>
			<video style="width: 100%;" :src="list.eventvideourl" controls></video>
		</view>
	</view>
</template>
<script>
	import { apiEventTraceEventById } from '@/common/api.js';
	export default {
		data() {
			return {
				list: {},
				eventtime: '',
				markers: [{
					id: 0,
					latitude: '',
					longitude: '',
					iconPath: '@/static/images/dingwei6.png',
					width: '30',
					height: '30'
				}],
			}
		},
		onLoad: function (option) {
			this.eventId = option.eventid;
			this.historical();
		},
		methods: {
			async historical(){ // 详情
				console.log('传参', this.eventId)
				const result = await apiEventTraceEventById({
					eventId:this.eventId
				});
				console.log('成功回调',result.data);
				// 全部内容
				this.list = result.data.data
				console.log(this.list, list)
				// 经纬度
				this.markers[0].latitude = result.data.data.latitude 
				this.markers[0].longitude = result.data.data.longitude
				// 时间戳转换
				console.log('毫秒数', result.data.data.eventtime)
				let d = new Date(result.data.data.eventtime);
				let batchDate = d.getFullYear() + '-' + (d.getMonth() + 1) + ':' + d.getDate()
				this.eventtime = batchDate
			}
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
