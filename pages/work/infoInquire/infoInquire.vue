<template>
	<view class="container">
		<view class="btns">
			<block v-for="btnItem in btnList" :key="btnItem.id">
				<view :class="['btn',btnItem.type+'-btn' ]" @click="goPage(btnItem.url)">{{btnItem.text}}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnList:[
					{
						id:1,
						text:'历史巡更事件',
						type:'green',
						url:'./eventList/eventList'
					},
					{
						id:2,
						text:'历史巡更地图分布',
						type:'red',
						url:'./mapDis/mapDis'
					},
					{
						id:3,
						text:'历史事件人查询',
						type:'blue',
						url:'./eventPersonList/eventPersonList'
					}
				]
			};
		},
		methods:{
			goPage(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.container{
	// position: relative;
	min-height:100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	.btns{
		width:500rpx;
		height:500rpx;
		.btn{
			text-align: center;
			font-size: 40rpx;
			// padding:10rpx 0;
			margin:40rpx 0;
			height:110rpx;
			line-height: 110rpx;
			color:white;
			border-radius: 8rpx;
		}
		.green-btn{
			background-color: #F5480C;
		}
		.red-btn{
			background-color: #F2FA04;
		}
		.blue-btn{
			background-color: #0466FA;
		}
		
	}
}
</style>
