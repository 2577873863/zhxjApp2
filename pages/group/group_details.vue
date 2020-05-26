<template>
	<view class="details" v-if="details">
		<view class="details_top">
			<view class="details_top_img">
				<image v-if="details.avatarUrl" :src="details.avatarUrl" mode="widthFix" />
				<image v-else src="../../static/images/toux.png" mode="widthFix"></image>
			</view>
			<view class="details_top_right">
				<view class="name">
					{{ details.username }}
				</view>
				<view class="sysname">
					系统姓名： {{ details.sysname }}
				</view>
			</view>
		</view>
		
		<view class="details_list">
			生日：{{ details.birthday }}
		</view>
		<view class="details_list" @click="onCellClick(details.phone)">
			<view class="text">
				手机号：{{ details.phone }}
			</view>
			<image src="../../static/images/phone.png" mode="widthFix" />
		</view>
		<view class="details_list">
			工号：{{ details.usernumber == undefined ? '' : details.usernumber}}
		</view>
		<view class="details_list">
			职务：{{ userrole[0].roleName == undefined ? '' : userrole[0].roleName }}
		</view>
		<view class="details_list">
			部门/地区： {{ area[0].areaName == undefined ? '': area[0].areaName}}
		</view>
		
		<view class="voice">
			<image src="../../static/images/voice.png" mode="widthFix" />
		</view>
	</view>
</template>

<script>
	import { findUserAreaList,findUserRoleList } from '@/common/api.js';
	let app = getApp()
	export default {
		data(){
			return{
				details:{} ,//详情
				area: {} ,// 部门
				userrole: [] //职务
			}
		},
		onLoad(options){
			console.log(JSON.parse(decodeURIComponent(options.details)),'--------------------------------')
			this.details = JSON.parse(decodeURIComponent(options.details))
			uni.setNavigationBarTitle({
				title: this.details.username + '的资料'
			})
		},
		onShow(){
			this.findUserAreaList()
			this.findUserRoleList()
		},
		methods:{
			async findUserAreaList(){
				let json = await findUserAreaList({
					accessToken: app.globalData.token
				})
				let title = json.data.data
				let area = this.details.area
				console.log(json)
				let a = title.filter( res => {
					if(area != undefined){
						return res.areaCode == area
					}
				})
				this.area = a
			},
			async findUserRoleList(){
				const json = await findUserRoleList({
					accessToken: app.globalData.token
				})
				let title = json.data.data
				let userrole = this.details.userrole
				let a = title.filter( res => {
					if(userrole != undefined){
						return res.roleCode == userrole
					}
				})
				this.userrole = a
			},
			onCellClick(phone){
				uni.makePhoneCall({
				    phoneNumber: phone
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.details{padding: 0 40rpx;
		.details_top{padding: 40rpx 0 80rpx;display: flex;align-items: center;
			.details_top_img{width: 160rpx;height: 160rpx;overflow: hidden;margin-right: 40rpx;}
			.details_top_right{flex: 1;
				.name{font-size: 48rpx;color: #333;margin-bottom: 28rpx;}
				.sysname{font-size: 30rpx;color: #666;}
			}
		}
		.details_list{display: flex;align-items: center;height: 110rpx;font-size: 32rpx;color: #333;border-bottom: 1px solid #eee;
			.text{flex: 1;}
			image{width: 60rpx;height: 60rpx;}
		}
		.voice{width: 120rpx;position: fixed;bottom: 20rpx;left: 50%;transform:translateX(-50%)}
	}
</style>
