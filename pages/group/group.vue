<template>
	<view class="group_con">
		<view style="padding: 0 20rpx;">
			<view class="group_input">
				<image src="../../static/images/sousuo.png" mode="widthFix"></image>
				<input type="text" value="" v-model="inputText" placeholder="请输入搜索内容" @input="searchh"/>
			</view>
		</view>
		<view class="group" v-for="(item,index) in groupList" :key="index" v-if="!isSearch">
			<view class="title" @click="unfold(index)">
				<image src="../../static/images/youjiantou.png" mode="widthFix" :class="{active: item.isShow}" style="width: 40rpx;transition: all 0.3s"></image>
				<view class="">{{ item.title }}</view>
			</view>
			<view class="group_list" v-if="item.isShow">
				<view v-for="(i,v) in item.groupList" :key="v" @click="toDetails(i)">
					<view class="avatar">
						<image v-if="i.avatarUrl" :src="i.avatarUrl" mode="widthFix"></image>
						<image v-else src="../../static/images/toux.png" mode="widthFix"></image>
					</view>
					<view class="name">{{ i.username }}</view>
				</view>
			</view>
		</view>
		
		<!-- 搜索页 -->
		<view class="search" v-if="isSearch">
			<view class="group_list">
				<view v-for="(item,index) in search" :key="index" @click="toDetails(item)">
					<view class="avatar">
						<image :src="item.avatarUrl" mode="widthFix"></image>
					</view>
					<view class="name">{{ item.username }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { findByUserGroupList } from '@/common/api.js';
	const app = getApp()
	export default {
		data() {
			return {
				inputText: '',
				groupList: [],
				groupListItem:[],
				isSearch: false
			};
		},
		beforeMount(){
			this.findByUserGroupList()
		},
		methods:{
			async findByUserGroupList(){
				const json = await findByUserGroupList({
				     accessToken: app.globalData.token,
				     value: ''
				})
				if(json.data.errno == 200){
				 this.groupList = json.data.data
				 let list = []
				 this.groupList.forEach( res => {
					 list.push(...res.groupList)
				 })
				 this.groupListItem = list
				}
			},
			//展开列表
			unfold(index){
				this.groupList[index].isShow = !this.groupList[index].isShow
			},
			// 跳转详情
			toDetails(details){
				this.isSearch = false
				let json = JSON.stringify(details)
				console.log(json)
				uni.navigateTo({
					url:'./group_details?details=' + encodeURIComponent(json)
				})
			},
			//搜索
			searchh(){
				if(this.inputText == ''){
					this.isSearch = false
				}else{
					this.isSearch = true
				}
			}
		},
		computed:{
			search() {
			  return this.groupListItem.filter(item => {
				return item.username.match(this.inputText);
			  });
			}
		}
	}
</script>

<style lang="less" scoped>
.group_con{
	.group_input{background: #F5F5F5;color: #666;font-size: 30rpx;padding-left: 30rpx;box-sizing: border-box;height: 60rpx;border-radius: 100rpx;display: flex;align-items: center;height: 64rpx;
		image{width: 36rpx;height: 36rpx;margin-right: 14rpx;}
		input{flex: 1;}
	}
	.group{
		&:nth-child(2){margin: 20rpx 0 16rpx;}
		.title{padding: 0 20rpx;font-size: 34rpx;display: flex;align-items: center;height: 76rpx;color: #666;
			&:active{background: #f7f7f7;}
			.active{transform: rotate(90deg);transition: all 0.3s}
		}
	}
	.group_list{
		>view{display: flex;align-items: center;padding: 26rpx 0;border-bottom: 1px solid #eee;padding-left: 36rpx;
			&:active{background: #f7f7f7;}
			.avatar{width: 80rpx;height: 80rpx; border-radius: 50%;overflow: hidden;margin-right: 16rpx;}
			.name{font-size: 34rpx;color: #666;}
		}
	}
}
</style>
