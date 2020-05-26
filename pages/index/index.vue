<template>
	<view class="button-sp-area">
		<!-- <label>房间号：</label> <input v-model="room" class="input" type="number" placeholder="请输入房间号" /> -->
		<label>用户名：</label> <input v-model="account" class="input" placeholder="请输入用户名" />
		<button type="primary" plain="true" @click="showVideoCall()">开启视频呼叫</button>
		<!-- <button type="primary" plain="true" @click="showComingVideoCall()">开启视频接听/挂断通话</button> -->
	</view>
</template>

<script>
	const sdkappid = '1400363589';
	const modal = uni.requireNativePlugin('modal');
	const dcRichAlert = uni.requireNativePlugin('TENCENT-CALL');
	
	import { apiGetVideoSign, apiGetRoomId } from '../../common/api.js';
	
	export default {
		data: {
			room: "",
			account: "123"
		},
		methods: {
			async showComingVideoCall() {
				let sign = await this.getVideoSign();
				dcRichAlert.startComingCallPage({
					roomid: this.room,
					accountid: this.account,
					name: "test123",
					avatar: "",
					appid: sdkappid,
					appsign: sign,
					calltype: "1",
					beauty: "1",
					whiteness: "1",
					ruddiness: "1"
				}, result => {
					const msg = JSON.stringify(result);
					modal.toast({
						message: msg,
						duration: 1.5
					});
				})
			},
			async showVideoCall() {
				let sign = await this.getVideoSign();
				let roomid = await this.getRoomId();
				uni.showToast({
					title:roomid
				})
				dcRichAlert.startInviteCallPage({
					roomid: roomid,
					accountid: this.account,
					name: "test123123",
					avatar: "",
					appid: sdkappid,
					appsign: sign,
					calltype: "1",
					beauty: "1",
					whiteness: "1",
					ruddiness: "1"
				}, result => {
					const msg = JSON.stringify(result);
					modal.toast({
						message: msg,
						duration: 1.5
					});
				})
			},
			async getVideoSign(){
				const result = await apiGetVideoSign({
					sysName: this.account
				});
				return result.data.data;
			},
			async getRoomId(){
				const result = await apiGetRoomId();
				console.log(result);
				return result.data.data;
			}
		}
	}
</script>

<style scoped>
	button {
		margin-top: 30upx;
		margin-bottom: 30upx;
	}

	.button-sp-area {
		margin-top: 100upx;
		margin: 0 auto;
		width: 80%;
	}

	.content {
		text-align: center;
		height: 400upx;
	}

	.wrapper {
		flex-direction: column;
		justify-content: center;
	}

	.input {
		background-color: #fff;
		padding-left: 10px;
		border-width: 1px;
		height: 80px;
		font-size: 30px;
		border-radius: 10px;
		width: 600px;
	}

	.button {
		width: 200px;
		margin-top: 30px;
		margin-left: 20px;
		padding-top: 20px;
		padding-bottom: 20px;
		border-width: 2px;
		border-style: solid;
		border-color: #458B00;
		background-color: #458B00;
	}

	.title {
		height: 50px;
	}

	.text {
		font-size: 30px;
		color: #666666;
		text-align: center;
	}
</style>