export function isEmptyObj(obj){ //判断是否是空对象
	for (var i in obj) { 
	    return false; // 如果不为空，则会执行到这一步，返回false
	}
	return true // 如果为空,返回true
}

export function getjwd(arr){ //获取经纬度
	let n_arr = [];
	arr.forEach(item=>{
		n_arr.push({
			longitude:item.longitude,
			latitude:item.latitude
		})
	})
	return n_arr;
}
//altitude：是否返回高度   
//geocode:是否解析地址信息
export function getLocation(altitude=false,geocode=true){
	return new Promise((resolve,reject)=>{
		uni.getLocation({
			type: "wgs84",
			altitude,
			geocode,
			success: res => {
				const { country, province, city, district, street, streetNum } = res.address;
				let GpsDO = {
					sys_name: wx.getStorageSync('sysname') || undefined, //用户的系统名字
					longitude: res.longitude, //经度
					latitude: res.latitude, //维度
					address: province + city + district + street + streetNum, //地址
					type: res.type, //类型
					speed: res.speed, //速度
					accuracy: res.accuracy, //精度
				}
				resolve({ error:0, data:GpsDO});
			},
			fail: err => {
				uni.showToast({
					title: '定位失败',
					icon: 'none',
					mask:true
				});
				reject({ error:1, data:err})
			}
		})
	})
}

//当前日期
export function getCurrentTime() {
  let keep = ''
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
//   keep = y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s
  keep = y + '-' + m + '-' + d
  return keep
}

//获取clientid
export function getClientId(){
	uni.showToast({
		title:'加载中...',
		icon:'loading',
		mask:true
	})
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			plus.push.getClientInfoAsync( result => {
				uni.hideLoading();
				resolve(result);
			}, (error)=>{
				uni.hideLoading();
				resolve({err:1,data:error});
			});
		},1000);
	})
}