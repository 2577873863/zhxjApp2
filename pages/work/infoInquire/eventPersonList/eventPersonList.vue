<template>
	<view>
		<mySearch
			:pickerArr="pickerArr"
			:doSearch="doSearch"
		></mySearch>
		<view class='pickerArr_title'>
			<view>事件人物</view>
			<view>事件电话</view>
		</view>
		<view class='for_pickerArr'>
			<view class='uni-collapse_item' v-for="(item, index) in pickerArr_center" @click="gotocontent(item.eventid)">
				<view>{{ item.eventpersonname }}</view>
				<view class='address'>
					<text> {{item.eventpersonphone}} </text>
					<image mode='widthFix' :src='arrowIcon'></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { apiEventPersonList } from '@/common/api.js';
	import mySearch from '@/components/mySearch/mySearch.vue';
	
	import arrowIcon from '../../../../static/images/arrowRight.png'
	export default {
		data() {
			return {
				arrowIcon,
				pickerArr:[
					{ id:1, value:'类型1' },
					{ id:2, value:'类型2' }
				],
				pickerArr_center: [],
				center_height: 0,
				page: 1,
				limit: 15,
				total_chunks: true
			}
		},
		onLoad() {
			this.getEventList(this.page, this.limit);
		},
		methods:{
			doSearch(result){
				console.log(result);
			},
			async getEventList(page, limit){
				const result = await apiEventPersonList({
					page,
					limit,
				});
				console.log('测试--》',result.data.data.items);
				if(result.data.data.code == 0){
					this.pickerArr_center = [...this.pickerArr_center, ...result.data.data.items];
					if(result.data.data.items.length < this.limit){
						this.total_chunks = false
					}
					console.log(pickerArr_center)
				}else{
					console.log('接口访问失败')
				}
			},
			gotocontent(e){
				uni.navigateTo({ url: '../historicalcontent/historicalcontent?eventid='+e});
			}
		},
		components:{
			mySearch
		},
		onReachBottom() { // 上拉加载更多
			if(this.total_chunks){
				console.log('上拉加载更多')
				this.page = this.page+1;
				this.getEventList(this.page, this.limit);
			}
		},
		onPullDownRefresh() {
			this.page = 1,
			this.pickerArr_center = []
			this.getEventList(this.page, this.limit);
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style lang="less" scoped>
.pickerArr_title{
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	display: flex;
	justify-content: space-around;
}
.for_pickerArr{
	border-top: 1px #ccc solid;
	margin:10rpx 40rpx;
	.uni-collapse_item{
		padding:30rpx;
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom:1px #ccc solid;
		.address{
			display: flex;
			align-items: center;
		}
		image{
			margin-left: 20rpx;
			width: 30rpx;
		}
	}
	
	
}
</style>
