<template>
	<view class="find_card">
		<view class="" v-if="isShow">
			<view class="find_input">
				<view>车主姓名</view>
				<input type="text" placeholder="车主姓名" v-model="carname"/>
			</view>
			<view class="find_input">
				<view>身份证</view>
				<input type="text" placeholder="身份证" v-model="carid" />
			</view>
			<view class="find_input">
				<view>手机号</view>
				<input type="text" placeholder="手机号" v-model="mobile"/>
			</view>
			<view class="find_input">
				<view>车牌号</view>
				<input type="text" placeholder="车牌号" v-model="vinno"/>
			</view>
			<button type="primary" class="btn" @click="submit">查询</button>
		</view>
		
		<view class="" v-else>
			<view class="personal_item" v-for="(item,index) in arrList">
				<view class="personal_list">
					<view class="personal_left">
						车主姓名：
					</view>
					<view class="personal_right">
						{{ item.carname }}
					</view>
				</view>
				<view class="personal_list">
					<view class="personal_left">
						手机号码：
					</view>
					<view class="personal_right">
						{{ item.mobile }}
					</view>
				</view>
				<view class="personal_list">
					<view class="personal_left">
						身份号码：
					</view>
					<view class="personal_right">
						{{ item.carid }}
					</view>
				</view>
				
				<view class="personal_list">
					<view class="personal_left">
						车牌号码：
					</view>
					<view class="personal_right">
						{{ item.vinno }}
					</view>
				</view>
				<view class="personal_list">
					<view class="personal_left">
						防盗芯片：
					</view>
					<view class="personal_right">
						{{ item.tagcode }}
					</view>
				</view>
				<view class="personal_list">
					<view class="personal_left">
						车辆颜色：
					</view>
					<view class="personal_right">
						{{ carcolours[item.carcolour] }}
					</view>
				</view>
				
				<view class="personal_list">
					<view class="personal_left">
						车辆品牌：
					</view>
					<view class="personal_right">
						{{ item.vehiclebrand }}
					</view>
				</view>
				<view class="personal_list">
					<view class="personal_left">
						车辆类型：
					</view>
					<view class="personal_right">
						{{ cartype[item.lighttypes] }}
					</view>
				</view>
				<view class="personal_list">
					<view class="personal_left">
						备案时间：
					</view>
					<view class="personal_right">
						{{ item.bugtime }}
					</view>
				</view>
				<view class="personal_list">
					<view class="personal_left">
						备案照片：
					</view>
				</view>
				<view class="img_group">
					<view class="img_pic" v-if="item.img1" @click="preImg(1,item.img1)">
						<image :src="item.img1" mode="widthFix"></image>
					</view>
					<view class="img_pic" v-if="item.img2" @click="preImg(2,item.img2)">
						<image :src="item.img2" mode="widthFix"></image>
					</view>
					<view class="img_pic" v-if="item.img3" @click="preImg(3,item.img3)">
						<image :src="item.img3" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view style="position: fixed;bottom: 20rpx;right: 20rpx;padding: 12rpx 32rpx;text-align: center;border-radius: 10rpx;background: #26a9ec;font-size: 32rpx;color: #fff;" @click="isShow= true">返回</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				carname: '',
				carid: '',
				mobile: '',
				vinno: '',
				isShow: true,
				arrList:[],
				carcolours: {
					white: "白色",
					black: "黑色",
					red: "红色",
					orange: "橙色",
					yellow: "黄色",
					blue: "蓝色",
					pink: "粉色",
					brown: "棕色",
					silverGray: "银灰色",
					silverWhite: "银白色",
					violet: "紫色",
					golden: "金色",
					green: "绿色",
					other: "其他"
				},
				cartype:{
					lun2:"二轮",
					lun3:"三轮", 
					lun4:"四轮", 
					motor:"摩托车", 
					other:"其他"
				},
			}
		},
		methods:{
			submit(){
				uni.request({
					url: 'https://backend.hbmcxxkj.com/polices/findCar',
					method:'POST',
					data: {
						carname:this.carname,
						carid:this.carid,
						mobile:this.mobile, 
						vinno:this.vinno,
						
					},
					header:{
						"content-type": "application/json; charset=UTF-8",
						"userid" : 1,
					},
					success: res => {
						console.log(res)
						if(res.statusCode == 200){
							console.log(123)
							this.isShow = false
							this.arrList = res.data.data
						}
					},
				})
			},
			preImg(index,url){
				let a = []
				a.push(url)
				uni.previewImage({
					urls: a
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.find_card{
		padding: 40rpx;
	}
	.find_input{display: flex;align-items: center;height: 100rpx;border-bottom: 1px solid #eee;
		>view{font-size: 28rpx;margin-right: 20rpx;width: 120rpx;}
		input{color: #555;font-size: 28rpx;flex: 1;}
	}
	.btn{background: #39bffd;color: #fff;margin-top: 180rpx;}
	.personal_list{display: flex;align-items: center;padding: 26rpx 0;background: #fff;border-bottom: 1px solid #eee;
		&:nth-last-child(2){border: 0;}
		.personal_left{font-size: 36rpx;color: #333;padding-left: 20rpx;}
		.personal_right{color: #888;font-size: 30rpx;}
	}
	.personal_item{border: 1px solid #eee;margin-bottom: 100rpx;}
	.img_group{display: flex;padding: 0 0 20rpx 20rpx;
		.img_pic{width: 200rpx;height: 200rpx;margin-right: 40rpx;overflow: hidden;border-radius: 8rpx ;
			image{width: 100%;height: 100%;}
		}
	}
</style>
