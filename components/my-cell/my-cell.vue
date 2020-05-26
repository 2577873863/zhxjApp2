<template>
	<view v-if="operateArr">
		<block v-for="(item,index) in operateArr">
			<view class="cell-container" @click="onCellClick(index,item.url)">
				<view>
					<image class="icon" :src="item.icon"></image>
					<text class="title">{{item.title}}</text>
				</view>
				<view>
					<text v-if="item.moreText != ''" class="more-text">{{item.moreText}}</text>
					<uniIcons type="arrowright" size="20"></uniIcons>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	export default {
		props:{
			operateArr: {
				type: Array,
				required:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			onCellClick(index,url){
				if(index == 2){
					uni.makePhoneCall({
					    phoneNumber: '123465'
					})
				}else{
					uni.navigateTo({
						url
					})
				}
				
			}
		},
		components:{
			uniIcons
		}
	}
</script>

<style lang="less" scoped>
.cell-container{
	color: #666;
	height:80rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom:1px solid #f1f1f1;
	&:active{background: #f7f7f7;}
	.icon{
		// display: block;
		width:25rpx;
		height: 25rpx;
		margin-right: 20rpx;
	}
	.title{
		font-size: 30rpx;
	}
	.more-text{
		font-size: 30rpx;
		margin-right: 20rpx;
	}
}
</style>
