<template>
	<view>
		<view>
			<!-- <view>{{sysname}}</view> -->
		</view>
		<view class="container">
			<view @click="doCheckIn" class="chenk-in-btn">{{options[optionsIdx]}}</view>
		</view>
	</view>
</template>

<script>
	import { 
		apiFindByIdSchedule, apiUpCheckIn, apiBelowClockIn, apiCreateGps
	} from '../../../common/api.js';
	import { getLocation, isEmptyObj } from '../../../common/common.js';
	let timer;
	export default {
		data() {
			return {
				options:['','上班','下班','休息'],
				optionsIdx:0,
				address:{},
				GpsDO: {}, //定位信息
				sysname: wx.getStorageSync('sysname')
			}
		},
		created() {
			this.findByIdSchedule();
		},
		methods: {
			async findByIdSchedule(){
				const result = await apiFindByIdSchedule({
					sysname:this.sysname
				});
				console.log('result=>',JSON.stringify(result));
				//1->上班   2->下班  3->休息
				const { stete, latitude, longitude } = result.data.data;
				this.optionsIdx = stete;
				this.address = { longitude,latitude };
				if( stete == 2 ){
					const {error,data:GpsDO} = await getLocation();
					if(error){
						wx.showToast({
							title:'系统出现错误',
							icon:'none',
							mask:true
						});
						return;
					}
					this.startInterval( GpsDO ) ;
				}
			},
			async doCheckIn(){
				const { optionsIdx, address, sysname } = this;
				const {error,data:GpsDO} = await getLocation();
				if(error){
					wx.showToast({
						title:'系统出现错误',
						icon:'none',
						mask:true
					});
					return;
				}
				
				switch (optionsIdx){
					case 1:
						//判断方圆500m
					
						const up_result = await apiUpCheckIn({
							ScheduleUserDTO: JSON.stringify(GpsDO)
						});
						this.findByIdSchedule();
						this.isCheckInOk(1,below_result);
						this.startInterval( GpsDO );
						// console.log('上班打卡=>',JSON.stringify(up_result));
						break;
					case 2:
						const below_result = await apiBelowClockIn({ sysname });
						this.findByIdSchedule();
						this.isCheckInOk(2,below_result);
						this.cancelInterval();
						// console.log('下班打卡=>',JSON.stringify(below_result));
						break;
					default:
						break;
				}
			},
			isCheckInOk(optionsIdx,res){
				uni.showToast({
					title:`${optionsIdx == 1 ? '上班':'下班'}打卡成功`,
					icon:'success',
					mask:true
				})
			},
			startInterval( GpsDO ){
				timer = setInterval(async ()=>{
					await this.createGPSInfo( GpsDO )
				},3000)
			},
			cancelInterval(){
				clearInterval(timer);
			},
			async createGPSInfo(GpsDO) { //创建定位信息
				if (isEmptyObj(this.GpsDO)) {
					console.log('第一次定位');
					this.GpsDO = GpsDO;
				} else {
					const {
						longitude,
						latitude
					} = GpsDO;
					const {
						longitude: t_longitude,
						latitude: t_latitude
					} = this.GpsDO
					if (
						Math.round(longitude) == Math.round(t_longitude) && 
						Math.round(latitude) == Math.round(t_latitude)
					) {
						console.log('位置没有变化');
						// wx.showToast({
						// 	title:'位置没有变化',
						// 	icon:'none',
						// 	mask:false
						// })
						return;
					}
				}
				this.GpsDO = GpsDO;
				const req_res = await apiCreateGps({
					GpsDO: JSON.stringify(GpsDO)
				});
				// console.log('请求结果=>',JSON.stringify(req_res));
				wx.showToast({
					title: req_res.data.errmsg + JSON.stringify(GpsDO),
					icon: 'none',
					mask: true,
					duration: 1000
				})
			},
		}
	}
</script>

<style scoped lang="less">
.container{
	align-items:center;
	display:flex;
	height:100vh;
	justify-content:center;
	margin:0;
	.chenk-in-btn{
		border:0;
		text-align: center;
		line-height: 200rpx;
		color:white;
		width:200rpx;
		height:200rpx;
		background-color: #40c1fd;
		border-radius: 50%;
	  box-sizing:border-box;
	  position:relative;
	}
	
	.chenk-in-btn:before {
	  animation:ripple 2s ease-out infinite;
	  border:solid 2px #09c;
	  border-radius:50%;
	  bottom:0;
	  box-sizing:border-box;
	  content:"";
	  left:0;
	  position:absolute;
	  right:0;
	  top:0;
	}
	
	.chenk-in-btn:after {
	  animation:ripple 2s 1s ease-out infinite;
	  border:solid 2px #09c;
	  border-radius:50%;
	  bottom:0;
	  box-sizing:border-box;
	  content:"";
	  left:0;
	  position:absolute;
	  right:0;
	  top:0;
	}
	
	@keyframes ripple {
	  0% {
	    opacity:.25;
	  }
	  100% {
	    border-radius:50%;
	    opacity:0;
	    transform:scale(3);
	  }
	}
}
</style>
