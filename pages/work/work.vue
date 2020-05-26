<template>
	<view>
		<!-- <view class="user-info">
			<view style="position: relative;" class="avatar">
				<image mode="widthFix" :src="userInfo.avatarUrl"></image>
			</view>
			<view class="">
				<view>姓名：{{userInfo.username}}</view>
				<view>职位</view>
				<view>部门</view>
			</view>
		</view>
		<view class="head">
			<view class="water">
				<view class="water-c">
					<view class="water-1"> </view>
					<view class="water-2"> </view>
				</view>
			</view>
		</view> -->
		
		<view class="user-top">
			<image src="../../static/images/wrok_bg.png" mode="widthFix"></image>
		</view>
		<view class="operate-group">
			<view class="operate-view" v-for="operateItem in operateArray" :key="operateItem.id">
				<!-- <view class="line"></view>
				<view class="operate-title">{{operateItem.title}}</view> -->
				<view class="operate-content">
					<view 
						class="item" 
						v-for="item in operateItem.operates" 
						:key="item.id"
						@click="onOperateClick(item.url)"
					>
						<image 
							class="operate-cover" 
							:src="item.cover"
							mode="widthFix"
						></image>
						<view class="operate-name">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { apiUserInfo } from '@/common/api.js';
	export default {
		onLoad() {
			this.getUserInfo();
		},
		
		data() {
			return {
				userInfo:{},
				operateArray:[
					{
						id:1,
						title:'常用工作',
						operates:[
							{
								id:1, name:'巡更考勤',
								cover:'/static/images/work/kaoqin.png',
								url:'./checkIn/checkIn'
							},
							{ 
								id:2, name:'事件上报',
								cover:'/static/images/work/shangbao.png' ,
								url:'./information/index'
							},
							{ id:3, name:'跟踪处理',cover:'/static/images/work/genzong.png'}
						]
					},
					{
						id:2,
						title:'信息数据',
						operates:[
							{ 
								id:1, name:'信息查询',
								cover:'/static/images/work/xinxi.png',
								url:'./infoInquire/infoInquire'
							},
							{ 
								id:2, name:'巡更轨迹',
								cover:'/static/images/work/guiji.png',
								url:'./track/track'
							},
							{
								id:3, name:'智慧电车',
								cover:'/static/images/work/dianche.png',
								// url:'./track/track'
								url:'./findCard/find_card'
							},
						]
					}
				]
			};
		},
		methods:{
			async getUserInfo(){
				console.log('getuserinfo==');
				let res = await apiUserInfo();
				this.userInfo = res.data.data;
			},
			onOperateClick(url){
				if(url){
					uni.navigateTo({
						url
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #f4f4f4;
	}
	.user-top{height: 400rpx;background: red;overflow: hidden;}
.head{
	height: 300rpx;
	margin-top: 100rpx;
	background-image: -webkit-linear-gradient(#39bffd 0%, #99dcff 100%);
	background-image: -o-linear-gradient(#39bffd 0%, #99dcff 100%);
	background-image: linear-gradient(#39bffd 0%, #99dcff 100%);
	width: 100%;
	position: relative;
	overflow: hidden;
	.water {
	  position: absolute;
	  left: 0;
	  bottom: -10px;
	  height: 30px;
	  width: 100%;
	  z-index: 1;
	}
	.water-c {
	  position: relative;
		.water-1, .water-2 {
		  position: absolute;
		  width: 100%;
		  height: 60px;
		}
	}
	
	@keyframes wave-animation-1 {
	  0% {
	    background-position: 0 top;
	  }
	  100% {
	    background-position: 600px top;
	  }
	}
	@keyframes wave-animation-2 {
	  0% {
	    background-position: 0 top;
	  }
	  100% {
	    background-position: 600px top;
	  }
	}
	
	.water-1 {
	  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0xPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMTMzLjAwMDAwMCkiIGZpbGwtb3BhY2l0eT0iMC4zIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9IndhdGVyLTEiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMS4wMDAwMDAsIDEzMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDcuNjk4NTczOTUgTDQuNjcwNzE5NjJlLTE1LDYwIEw2MDAsNjAgTDYwMCw3LjM1MjMwNDYxIEM2MDAsNy4zNTIzMDQ2MSA0MzIuNzIxMDUyLDI0LjEwNjUxMzggMjkwLjQ4NDA0LDcuMzU2NzQxODcgQzE0OC4yNDcwMjcsLTkuMzkzMDMwMDggMCw3LjY5ODU3Mzk1IDAsNy42OTg1NzM5NSBaIiBpZD0iUGF0aC0xIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
	  background-size: 600px;
	  -webkit-animation: wave-animation-1 3.5s infinite linear;
	  animation: wave-animation-1 3.5s infinite linear;
	}
	
	.water-2 {
	  top: 5px;
	  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMjQ2LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0id2F0ZXItMiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIxLjAwMDAwMCwgMjQ2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNy42OTg1NzM5NSBMNC42NzA3MTk2MmUtMTUsNjAgTDYwMCw2MCBMNjAwLDcuMzUyMzA0NjEgQzYwMCw3LjM1MjMwNDYxIDQzMi43MjEwNTIsMjQuMTA2NTEzOCAyOTAuNDg0MDQsNy4zNTY3NDE4NyBDMTQ4LjI0NzAyNywtOS4zOTMwMzAwOCAwLDcuNjk4NTczOTUgMCw3LjY5ODU3Mzk1IFoiIGlkPSJQYXRoLTIiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMC4wMDAwMDAsIDMwLjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMzAwLjAwMDAwMCwgLTMwLjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
	  background-size: 300px;
	  -webkit-animation: wave-animation-2 6s infinite linear;
	  animation: wave-animation-2 6s infinite linear;
	}
}
.user-info{
	position: fixed;
	top: 0;
	z-index: 999;
	display: flex;
	align-items: flex-end;
	color:white;
	padding:0 50rpx;
	.avatar{
		width:200rpx;
		border-radius: 10%;
		margin-right: 100rpx;
	}
}
.operate-group{
	position:relative;
	top: -60rpx;
	width: 90%;
	background: #fff;
	margin: 0 auto;
	border: 1px solid #eee;
	padding: 10rpx 0;
	border-radius: 10rpx;
	box-shadow: 0 10rpx 10rpx #e0e0e0;
}
.operate-view{
	.operate-title{
		font-size: 30rpx;
		margin:20rpx;
	}
	.operate-content{
		// padding:;
		display: flex;
		flex-wrap: wrap;
		.item{
			width:33.33%;
			padding:24rpx 10rpx;
			box-sizing: border-box;
			text-align: center;
			.operate-name{
				font-size: 22rpx;
				color: #666;
			}
			.operate-cover{
				width: 89rpx;
				height: 90rpx;
				margin-bottom: 20rpx;
			}
		}
	}
}
</style>
