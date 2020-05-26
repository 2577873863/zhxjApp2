<template>
	<view>
		<view class="search-view">
			<mySearch 
				:pickerArr="pickerArr" 
				:doSearch="doSearch"
			></mySearch>
		</view>
		<map 
			class="map" 
			:scale="18"
			:markers="markers"
			:longitude="longitude"
			:latitude="latitude"
		></map>
	</view>
</template>

<script>
	import { apiFindGpsMap } from '@/common/api.js';
	export default {
		onLoad() {
			this.getDisList();
		},
		data() {
			return {
				latitude:'', //当前维度
				longitude:'',//当前经度
				res_list:[],
				markers:[],
				//搜索数据
				pickerArr:[
					{ id:1, value:'搜索种类1'},
					{ id:2, value:'搜索种类2'},
				],
				searhType:''
			}
		},
		methods: {
			async getDisList(){
				const res = await apiFindGpsMap();
				// console.log(res.data.data);
				res.data.data.map(item=>{
					item.iconPath = '/static/images/tabbar/my-act.png';
					item.title = item.eventaddress;
					return item;
				})
				this.markers = res.data.data;
				this.longitude = res.data.data[0].longitude;
				this.latitude = res.data.data[0].latitude;
				console.log(this.latitude,this.longitude);
			},
			doSearch(obj){
				const {type,value} = obj;
				wx.showToast({
					title:`搜索类型是${type.value},搜索内容是${value}`,
					icon:'none'
				})
				// console.log('搜索:',obj);
			}
		},
		components:{
		}
	}
</script>

<style lang="less" scoped>
@searhHeight:70rpx;
.search-view{
	height:@searhHeight;
	display: flex;
	align-items: center;
	// background-color: red;
}
.map{
	width:100vw;
	height:calc( 100vh - 100rpx );
}
</style>
