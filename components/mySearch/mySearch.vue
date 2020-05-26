<template>
	<view class="container">
		<view class="picker-view">
			<view class="uni-list-cell-db">
				<picker 
					@change="bindPickerChange" 
					:value="pickerIndex" 
					:range="pickerArr"
					range-key="value"
				>
					<view class="uni-input">{{pickerArr[pickerIndex].value}}</view>
				</picker>
			</view>
		</view>
		<view class="input-view">
			<input
				type="text" 
				:value="inpVal"
				confirm-type="search"
				@input="bindInput"
				@confirm="bindInputSearch"
			>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			pickerArr:Array,
			doSearch:Function
		},
		data() {
			return {
				pickerIndex:0, 
				searchValue:'',
				searchType:'',
				inpVal:''
			};
		},
		methods:{
			bindPickerChange(e){
				console.log(e.detail.value)
				const {pickerArr, pickerChange} = this;
				this.pickerIndex = e.detail.value;
				// this.searchValue=''; //类型改变清空搜索内容
			},
			bindInput(e){
				this.searchVal = e.detail.value;
			},
			bindInputSearch(e){
				const {pickerIndex,pickerArr,searchVal,doSearch} = this;
				const obj = {
					type:pickerArr[pickerIndex],
					value:searchVal
				}
				doSearch && doSearch(obj);
				
			}
		}
	}
</script>

<style lang="less" scoped>
.container{
	border:1px #ccc solid;
	border-radius: 100rpx;
	margin:10rpx 30rpx;
	display: flex;
	font-size: 30rpx;
	align-items: center;
	.picker-view{
		flex:1;
		text-align: center;
	}
	.input-view{
		flex:2;
		padding: 14rpx;
		border-left: 1px #ccc solid;
	}
}
</style>
