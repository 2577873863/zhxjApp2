<template>
	<view class="container">
		<view class="logo">
			<image src="../../static/images/logo.png" mode="widthFix"></image>
		</view>
		<view class="inp-view">
			<input type="text" v-model="username" placeholder="请输入账号">
		</view>
		<view class="inp-view">
			<input type="text" :password="isPassword" v-model="password" placeholder="请输入密码">
			<image src="../../static/images/look.png" mode="widthFix" @click="isPassword = !isPassword"></image>
		</view>
		<button @click="doLogin" class="login-btn" type="primary">登录</button>
	</view>
</template>

<script>
	const app = getApp();
	import { apiLogin } from '@/common/api.js';
	import { getClientId } from '@/common/common.js';
	export default {
		data() {
			return {
				username: '15128098798',
				password: '123456a',
				GpsDO: {}, //定位信息
				isPassword: true
			}
		},
		onLoad() {
			this.handleNotice();
			if (uni.getStorageSync('token')) {
				uni.redirectTo({
					url: "../index/index"
				})
			}
		},
		methods: {
			async doLogin() {
				const cid_res = plus.push.getClientInfo();
				const {	username, password } = this;
				const req_data = {
					sysname: username,
					password: password,
					clientId: cid_res.clientid
				};
				console.log(JSON.stringify(req_data));
				let res = await apiLogin(req_data);
				console.log('login result == >', JSON.stringify(res));
				//保存到全局
				getApp().globalData.token = res.data.data.accessToken
				//保存到缓存
				uni.setStorageSync('accessToken', res.data.data.accessToken);
				uni.setStorageSync('clientId', app.globalData.clientid);
				uni.setStorageSync('sysname', username);
					
				uni.switchTab({
					url: "../index/index"
				});
			},
			handleNotice(e) {
				let system = uni.getSystemInfoSync(); // 获取系统信息
				// console.log(JSON.stringify(system));
				if (system.platform === 'android') { // 判断平台
					var context = plus.android.importClass("android.content.Context");
					var locationManager = plus.android.importClass("android.location.LocationManager");
					var main = plus.android.runtimeMainActivity();
					var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
					if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
						uni.showModal({
							title: '提示',
							content: '请打开定位服务功能',
							showCancel: false, // 不显示取消按钮
							success() {
								if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
									var Intent = plus.android.importClass('android.content.Intent');
									var Settings = plus.android.importClass('android.provider.Settings');
									var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
									main.startActivity(intent); // 打开系统设置GPS服务页面
								} else {
									console.log('GPS功能已开启');
								}
							}
						});
					}
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding-top: 160rpx;

		.logo {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			margin: 0 auto 80rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.inp-view {
			background: #F5F5F5;
			border-radius: 10rpx;
			height: 80rpx;
			width: 672rpx;
			margin: 0 auto 60rpx;
			display: flex;
			align-items: center;
			padding: 0 40rpx;
			box-sizing: border-box;

			input {
				color: #666;
				font-size: 32rpx;
				flex: 1;
			}

			image {
				width: 40rpx;
			}
		}

		button {
			margin-top: 120rpx;
			width: 672rpx;
		}
	}
</style>
