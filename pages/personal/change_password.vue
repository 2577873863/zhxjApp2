<template>
	<view class="change_password">
		<view class="prompt">提示： 设置密码后可以通过登录名/手机号+登录密码登录系统</view>
		<view class="password_group">
			<view class="name">
				系统名字：{{ sysname }}
			</view>
			
			<view class="password">
				<view>旧密码</view>
				<input type="text" placeholder="输入旧密码" v-model="oldPassword"/>
			</view>
			<view class="password">
				<view>新密码</view>
				<input type="text" placeholder="新密码" v-model="newPassword" @blur="different(1)"/>
			</view>
			<view class="password">
				<view>确认密码</view>
				<input type="text" placeholder="确认密码" v-model="oncePassword" @blur="different(2)"/>
			</view>
			<view class="prompt1" v-if="passwordLength">密码最少6个字符同时包含字母和数字</view>
			<view class="prompt1" v-if="isDifferent">两次输入密码的不相同</view>
		</view>
		<button type="primary" class="btn" @click="submit" :disabled="!isBtn" :class="{active: isBtn}">确定</button>
	</view>
</template>

<script>
	import { resetPassword } from '@/common/api.js';
	const app = getApp() 
	export default {
		data(){
			return{
				sysname: '',
				oldPassword:'',
				newPassword:'',
				oncePassword:'',
				passwordLength: false,
				isDifferent: false
			}
		},
		beforeMount(){
			this.sysname = app.globalData.userInfo.sysname
		},
		methods:{
			//提交
			async submit(){
				let form = {
					accessToken: app.globalData.token,
					sysname: this.sysname,
					usedPassword: this.oldPassword,
					newPassword:this.oncePassword
				}
				const json = await resetPassword(form)
				if(json.data.errno == 200){
					uni.showModal({
						title: '提示信息',
						content: '修改成功请重新登陆',
						showCancel: false,
						success: res => {
							if(res.confirm){
								uni.reLaunch({
									url: '../login/login'
								})
							}
						}
					})
				}else if(json.data.errno == 11006){
					uni.showToast({
						title: '请检查原密码是否错误',
						mask:true,
						icon: 'none',
						duration: 1500
					})
				}
			},
			
			different(index){
				if(index == 1){
					let password = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i
					if(password.test(this.newPassword) && this.newPassword.length >= 6){
						this.passwordLength = false
					}else{
						this.passwordLength = true
					}
					this.isPassword()
				}else{
					this.isPassword()
				}
			},
			//判断密码是否相同
			isPassword(){
				if(this.newPassword != this.oncePassword){
					this.isDifferent = true
				}else{
					this.isDifferent = false
				}
			}
		},
		computed:{
			isBtn(){
				if(!this.passwordLength && !this.isDifferent && this.oldPassword != '' && this.newPassword != '' && this.oncePassword != ''){
					return true
				}else{
					return false
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.change_password{
		padding: 40rpx;
		.prompt{color: red;font-size: 24rpx;}
		.name{font-size: 34rpx;color: #333;padding: 40rpx 0 20rpx; border-bottom: 16rpx solid #eee;margin-bottom: 22rpx;}
		.password{display: flex;align-items: center;height: 100rpx;border-bottom: 1px solid #eee;
			>view{font-size: 28rpx;margin-right: 20rpx;width: 120rpx;}
			input{color: #555;font-size: 28rpx;flex: 1;}
		}
		.prompt1{color: red;font-size: 24rpx;margin-top: 20rpx;}
		.btn{background: #cecece;color: #fff;margin-top: 180rpx;}
		.active{background: #39bffd}
	}
</style>
