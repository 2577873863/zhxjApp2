<template>
	<view>
		<view class="input time">
			<text>事件时间<text>(必填)</text></text>
			<view class="picker">
				<picker mode="date" @change="bindTime">
					<view>{{ eventData == ''?'请选择事件时间':eventData }}</view>
				</picker>
			</view>
		</view>
		<view class="input address">
			<text>事件地址<text>(必填)</text></text>
			<input type="text" v-model="address" placeholder="请填写事件地址(必填)"/>
			<view style="width: 50rpx;height: 50rpx;" @click="openMap">
				<image src="../../../static/images/address.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="input name">
			<text>事件名称<text>(必填)</text></text>
			<input type="text" v-model="eventName" placeholder="请填写事件名称"/>
		</view>
		<!-- 事件类型 -->
		<view class="type">
			<text>事件类型<text>(必填)</text></text>
			<view class="picker">
				<picker mode="selector"  :range="array" @change="bindPickerChange">
					<view>{{ arrayIndex == ''?'选择事件类型':array[arrayIndex]}}</view>
				</picker>
			</view>
			<view class="picker_img">
				<image src="../../../static/images/xiala.png" mode="widthFix"></image>
			</view>
		</view>
		<!-- 事件人姓名 -->
		<view class="event_group">
			<view class="event_list" v-for="(item,index) in eventFrom" :key="index">
				<input type="text" value="" placeholder="事件人名字(必填)" v-model="item.eventpersonname"/>
				<input type="text" value="" placeholder="事件人身份证(必填)" v-model="item.eventpersonid"/>
				<input type="text" value="" placeholder="事件人手机号(必填)" v-model="item.eventpersonphone"/>
				<view class="closed" @click="closed(1,index)">
					<image src="../../../static/images/guanbi.png" mode="widthFix"></image>
				</view>
			</view>
			<view style="width: 180rpx;height: 180rpx;margin: 0 auto;text-align: center;" v-if="eventFrom.length < 2">
				<image src="../../../static/images/event_add.png" mode="widthFix" @click="addEvent"/>
			</view>
		</view>
		
		<view class="type">
			<text>事件类型<text>(必填)</text></text>
			<view class="picker">
				<picker mode="selector"  :range="level" @change="levelChange">
					<view>{{ levelIndex == ''?'请选择事件时间':level[levelIndex] }}</view>
				</picker>
			</view>
			<view class="picker_img">
				<image src="../../../static/images/xiala.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="type">
			<text>事件类型<text>(必填)</text></text>
			<view class="picker">
				<picker mode="selector"  :range="entry" @change="entryChange">
					<view>{{ entryIndex == ''?'录入状态':entry[entryIndex] }}</view>
				</picker>
			</view>
			<view class="picker_img">
				<image src="../../../static/images/xiala.png" mode="widthFix"></image>
			</view>
		</view>
		
		<!-- 图片上传 -->
		<view class="Uploadimg">
			<view class="img imgItem" v-for="(item,index) in imgList">
				<image :src="item"></image>
				<view class="closedImg" @click="closed(2,index)">
					<image src="../../../static/images/guanbi.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="img" @click="Uploadimg(1)" v-if="imgList.length < 2">
				<image src="../../../static/images/add_img.png" mode="widthFix"></image>
			</view>
		</view>
		<!-- 视频上传 -->
		<view class="video_group">
			<view class="video_bg" v-if="videoList.length == 0" @click="Uploadvideo()">
				<view class="video_img">
					<image src="../../../static/images/shiping.png" mode="widthFix"></image>
				</view>
				<text>视频上传</text>
			</view>
			<video :src="videoList" controls v-else></video> 
			<view class="closedImg" @click="closed(3)" v-if="videoList != '' ">
				<image src="../../../static/images/guanbi.png" mode="widthFix"></image>
			</view>
			
		</view>
		
		<view style="padding: 0 20rpx;margin: 100rpx 0 200rpx;">
			<button type="primary" style="background: #39bffd;" @click="submit" :class="{backgroundActive:isShow}" :disabled="isShow">提交</button>
		</view>
		
	</view>
</template>

<script>
	import { getCurrentTime } from '@/common/common.js'
	import { findEventEntryStatusList,findEventStateList,findEventTypeList, createEvent } from '@/common/api.js';
	const app = getApp()
	export default {
		name: 'information',
		data(){
			return{
				address:'',    //地址(必填)
				longitude: 0,
				latitude: 0,
				eventData:'',    //时间(必填)
				eventName:'',    //事件名称(必填)
				array: [],
				array1: [],
				arrayIndex: '',   //事件类型(必填)
				level: [], //事件级别
				level1: [], //事件级别
				levelIndex: '',
				entry: [], //录入状态
				entry1: [], //录入状态
				entryIndex:'',
				eventFrom:[
					{eventpersonname: '',eventpersonid: '',eventpersonphone: ''}
				],
				imgList:[],
				videoList:'',
				isEventFrom: false
			}
		},
		beforeMount(){
			this.findEventEntryStatusList()
			this.findEventTypeList()
			this.findEventStateList()
			this.getLocation()
			this.eventData = getCurrentTime()
		},
		computed:{
			isShow(){
				if(this.address != '' && this.eventData != '' && this.eventName != '' && this.arrayIndex != '' && this.levelIndex != '' && this.entryIndex != '' && this.eventFrom.length != 0){
					return false
				}else{
					return true
				}
			}
		},
		methods:{
			// 录入状态
			async findEventEntryStatusList(){
				const json = await findEventEntryStatusList({
				     accessToken: app.globalData.token
				})
				if(json.data.errno == 200){
					let arrList = json.data.data
					arrList.forEach(res => {
						this.entry.push(res.entryStatusName)
						this.entry1.push(res.entryStatusCode)
					})
				}
			},
			// // 事件状态
			async findEventStateList(){
				const json = await findEventStateList({
				     accessToken: app.globalData.token
				})
				if(json.data.errno == 200){
					let arrList = json.data.data
					arrList.forEach( res => {
						this.level.push(res.stateName)
						this.level1.push(res.stateCode)
					})
				}
			},
			// // 事件类型
			async findEventTypeList(){
				const json = await findEventTypeList({
					accessToken: app.globalData.token
				})
				if(json.data.errno == 200){
					let arrList = json.data.data
					arrList.forEach( res => {
						this.array.push(res.typeName)
						this.array1.push(res.typeCode)
					})
				}
			},
			// 上传方法
			async submit(){
				const sysname = app.globalData.sysname
				console.log(sysname)
				console.log(this.eventData)
				var eventDTO = {
					eventtime: this.eventData,
					sysname:sysname,
					eventName: this.eventName,
					eventaddress: this.address,
					longitude:this.longitude,
					latitude: this.latitude,
					eventstate:this.level1[this.levelIndex],
					eventtype: this.array1[this.arrayIndex],
					entryStatus: this.entry1[this.entryIndex],
					persons:this.eventFrom,
				}
				this.card(eventDTO.persons)
				if(!this.isEventFrom){
					console.log('正确')
					console.log(eventDTO,'---------------------------------------------')
					const json = await createEvent({
						EventDTO: eventDTO,
						accessToken: app.globalData.token
					})
					console.log(json)
					if(json.data.errno == 200){
						uni.showLoading({
							title:'上传中'
						})
						this.uploadImg() //上传图片
						this.uploadvideo() //上传视频
					}
				}else{
					uni.showToast({
						title: '事件卡片内容不能为空',
						icon: 'none',
						duration: 2000
					})
				}
				
			},
			// 定位
			getLocation(){
				uni.getLocation({
					success: function (res){
						console.log(res)
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				})
			},
			
			openMap(){
				uni.chooseLocation({
					success: res => {
						console.log(res)
						this.address = res.name,
						this.longitude=res.longitude
						this.latitude=res.latitude
					}
				})
			},
			//时间选择
			bindTime(e){
				this.eventData = e.detail.value
			},
			//事件选择
			bindPickerChange(e){
				this.arrayIndex = e.detail.value
			},
			levelChange(e){
				this.levelIndex = e.detail.value
			},
			entryChange(e){
				this.entryIndex = e.detail.value
			},
			// 添加事件
			addEvent(){
				let eventObj={eventpersonname: '',eventpersonid: '',eventpersonphone: ''}
				this.eventFrom.push(eventObj)
			},
			//删除
			closed(type,index){
				if(type == 1){
					this.eventFrom.splice(index,1)
				}else if(type == 3){
					this.videoList = ''
				}else{
					this.imgList.splice(index,1)
				}
			},
			//上传照片
			Uploadimg(){
				uni.chooseImage({
					count:1,
					success: res => {
						console.log(res)
						let imgUrl = res.tempFiles[0].path
						this.imgList.push(imgUrl)
					}
				})
			},
			uploadImg(){
				//递归循环上传图片
				let that = this
				var i = 0
				upload(i)
				function upload(i){
					uni.uploadFile({
						url: 'http://119.45.118.254:8070/upload/uploadFile',
						filePath: that.imgList[i],
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: res => {
							i++
							upload(i)
						}
					})
				}
			},
			// 上传视频
			Uploadvideo(){
				uni.chooseVideo({
					count: 1,
					sourceType: ['album','camera'],
					success: res => {
						this.videoList = res.tempFilePath
					}
				})
			},
			uploadvideo(){
				uni.uploadFile({
					url: 'http://119.45.118.254:8070/upload/uploadFile',
					filePath: this.videoList,
					name: 'file',
					formData: {
						'user': 'test'
					},
					success: res => {
						console.log(res,'是否上传成功')
						uni.hideLoading()
						uni.showToast({
							title: '成功',
							icon: 'success',
							duration: 2000
						})
						
					}
				})
			},
			// 判断事件卡片内的内容是否为空
			card(data){
				data.forEach( res => {
					if(res.eventpersonname != '' && res.eventpersonid != '' && res.eventpersonphone != '' ){
						this.isEventFrom = false
					}else{
						this.isEventFrom = true
					}
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.backgroundActive{background: #c7c7c7 !important;}
	.input{display: flex;align-items: center;padding: 0 20rpx;height: 100rpx;color: #333;border-bottom: 1px solid #eee;
		>text{margin-right: 20rpx;font-size: 28rpx;
			text{color: red;font-size: 26rpx;}
		}
		.picker{flex: 1;font-size: 26rpx;color: #666;}
		input{color: #666;font-size: 30rpx;flex: 1;}
		view{
			&:active{background: #eee;}
		}
	}
	.type{display: flex;align-items: center;padding: 0 20rpx;font-size: 30rpx;height: 100rpx;border-bottom: 1px solid #eee;
		>text{margin-right: 20rpx;font-size: 28rpx;
			text{color: red;font-size: 26rpx;}
		}
		.picker{flex: 1;font-size: 28rpx;color: #333;}
		.picker_img{width: 26rpx;height: 26rpx;}
	}
	.event_group{padding: 20rpx;border-bottom: 1px solid #eee;
		.event_list{margin-bottom: 30rpx;background: #f8f8f8;border-radius: 16rpx;padding: 20rpx 30rpx;position: relative;border: 1px solid #ddd;
			input{height: 70rpx;padding-left: 20rpx;border-radius: 66rpx;border: 1px solid #ccc;font-size: 26rpx;margin: 20rpx 0;}
			.closed{position: absolute;right: -10rpx;top: -10rpx;width: 40rpx;height: 40rpx;}
		}
	}
	
	.Uploadimg{padding: 30rpx 20rpx 20rpx;margin-top: 30rpx;border-top: 20rpx solid #eee;
		&::after{content: '';display: block;clear: both;}
		.img{width: 200rpx;height: 200rpx;border: 1px solid #eee;float: left;margin-right: 20rpx;position: relative;
			&.imgItem{image{height: 100%;height: 100%;}}
			.closedImg{width: 30rpx;height: 30rpx;position: absolute;right: -12rpx;top: -16rpx;}
		}
	}
	
	.video_group{height: 220rpx;width: 100%;padding: 0 20rpx;box-sizing: border-box;position: relative;
		.video_bg{border: 1px solid #eee;
			.video_img{margin: 0 auto;width: 160rpx;}
			text{font-size: 26rpx;text-align: center;display: block;position: relative;top: -10rpx;}
		}
		video{width: 100%;height: 100%;}
		.closedImg{position: absolute;right: 12rpx;top: -12rpx;width: 30rpx;height: 30rpx;z-index: 999;}
	}
</style>
