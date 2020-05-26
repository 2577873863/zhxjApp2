<template>
	<view class="personal_center">
		<view class="personal_list">
			<view class="personal_left">
				头像
			</view>
			<image :src="userInfo.avatarUrl" mode="widthFix" style="width: 100rpx;height: 100rpx;border-radius: 50%;overflow: hidden;"></image>
		</view>
		<view class="personal_list">
			<view class="personal_left">
				姓名
			</view>
			<view class="personal_right">
				{{ userInfo.username }}
			</view>
		</view>
		<view class="personal_list">
			<view class="personal_left">
				工号
			</view>
			<view class="personal_right">
				{{ userInfo.usernumber }}
			</view>
		</view>
		<view class="personal_list">
			<view class="personal_left">
				职务
			</view>
			<view class="personal_right">
				{{ userrole[0].roleName }}
			</view>
		</view>
		
		<view class="personal_list" style="margin-top: 30rpx;">
			<view class="personal_left">
				性别
			</view>
			<view class="personal_right">
				{{ userInfo.gender == 0? '男':'女' }}
			</view>
		</view>
		<view class="personal_list">
			<view class="personal_left">
				生日
			</view>
			<view class="personal_right">
				{{ userInfo.birthday }}
			</view>
		</view>
		<view class="personal_list">
			<view class="personal_left">
				部门
			</view>
			<view class="personal_right">
				{{ area[0].areaName }}
			</view>
		</view>
		
		<view class="personal_list" style="margin-top: 30rpx;">
			<view class="personal_left">
				手机号
			</view>
			<view class="personal_right">
				{{ userInfo.phone }}
			</view>
		</view>
	</view>
</template>

<script>
	import { apiUserInfo,findUserAreaList,findUserRoleList } from '@/common/api.js';
	const app = getApp()
	export default {
		data(){
			return{
				userInfo: {},
				area: [] ,// 部门
				userrole: [] //职务
			}
		},
		beforeMount(){
			this.getUserInfo()
		},
		methods:{
			async getUserInfo(){
				let json = await apiUserInfo();
				if(json.data.errno == 200){
					this.userInfo = json.data.data;
					this.findUserAreaList(json.data.data.area)
					this.findUserRoleList(json.data.data.userrole)
				}
				
			},
			async findUserAreaList(area){
				let json = await findUserAreaList({
					accessToken: app.globalData.token
				})
				let title = json.data.data
				let a = title.filter( res => {return res.areaCode == area})
				this.area = a
			},
			async findUserRoleList(userrole){
				const json = await findUserRoleList({
					accessToken: app.globalData.token
				})
				let title = json.data.data
				let a = title.filter( res => {return res.roleCode == userrole})
				this.userrole = a
			}
		}
	}
</script>

<style lang="less" scoped>
	page{background: #fbf8fb;}
	.personal_center{padding-top: 30rpx;}
	.personal_list{display: flex;align-items: center;padding: 26rpx 20rpx;background: #fff;border-bottom: 1px solid #fbf8fb;
		.personal_left{flex: 1;font-size: 36rpx;color: #333;}
		.personal_right{color: #888;font-size: 30rpx;}
	}
</style>
