<template>
	<view class="container">
		<view class="head">
			<view class="user-info">
				<view class="avatar">
					<image :src="userInfo.avatarUrl"></image>
				</view>
				<!-- <view>{{userInfo.username}}</view> -->
				<view>姓名</view>
			</view>
			<view class="water">
				<view class="water-c">
					<view class="water-1"> </view>
					<view class="water-2"> </view>
				</view>
			</view>
		</view>
		<view class="operates">
			<myCell :operateArr="operateArr"/>
		</view>
		<button type="primary" class="un_login" @click="logout">退出登录</button>
	</view>
</template>

<script>
	const app = getApp()
	import myCell from '@/components/my-cell/my-cell.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import { apiUserInfo,logout } from '@/common/api.js';
	export default {
		data() {
			return {
				// quitIcon,
				userInfo:{},
				operateArr:[
					{
						id:1,
						icon:'../../static/images/grxx.png',
						title:'个人信息',
						showArrow:true,
						url: '/pages/personal/personal_center'
					},
					{
						id:2,
						icon:'../../static/images/mm.png',
						title:'修改密码',
						showArrow:true,
						url: '/pages/personal/change_password'
					},
					{
						id:3,
						icon:'../../static/images/lxwm.png',
						title:'联系我们',
						showArrow:false,
						moreText:'18888888888'
					},
					{
						id:4,
						icon:'../../static/images/gywm.png',
						title:'关于我们',
						showArrow:false,
						url: '/pages/personal/personal_center'
					}
				]
			}
		},
		created() {
			console.log('personal created === ');
			this.getUserInfo();
		},
		
		onShow() {
			console.log('aaa');
		},
		methods: {
			async getUserInfo(){
				let res = await apiUserInfo();
				this.userInfo = res.data.data;
				getApp().globalData.userInfo = res.data.data
				// console.log('userinfo==>',JSON.stringify(res.data.data));
			},
			logout(){
				uni.showModal({
					title: '提示',
					content:'您将要退出登录是否退出？',
					success: res => {
						if(res.confirm){
							//点击确定
							this.unlogin()
						}
					}
				})
			},
			//退出登录
			async unlogin(){
				const json = await logout({
					ACCESSTOKEN: app.globalData.token
				})
				if(json.statusCode == 200){
					uni.reLaunch({
						url: '../login/login'
					})
				}
			}
		},
		components:{
			uniIcons,myCell
		}
	}
</script>

<style lang="less" scoped>
	.head{
		height: 200rpx;
		background-image: -webkit-linear-gradient(#39bffd 0%, #99dcff 100%);
		background-image: -o-linear-gradient(#39bffd 0%, #99dcff 100%);
		background-image: linear-gradient(#39bffd 0%, #99dcff 100%);
		width: 100%;
		position: relative;
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
		  background-size: 600px;
		  -webkit-animation: wave-animation-2 6s infinite linear;
		  animation: wave-animation-2 6s infinite linear;
		}
		.user-info{
			position: relative;
			top: 30rpx;
			z-index: 99;
			display: flex;
			align-items: center;
			flex-direction: column;
			text-align: center;
			color:#333;
			padding:25rpx;
			.avatar{
				background:red;
				width:160rpx;
				height:160rpx;
				overflow: hidden;
				border-radius: 50%;
				image{width: 100%;height: 100%;}
			}
		}
	}
	.operates{
		padding: 30rpx;
		margin-top: 80rpx;
		// margin-top:150rpx;
	}
	.un_login{
		width: 94%;
		margin-top: 70rpx;
		background: #39bffd;
		font-size: 32rpx;
	}
</style>

