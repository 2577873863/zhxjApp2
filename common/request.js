const app = getApp();
let timer = null;
const REQUESTTIMEOUT = 15*1000; //请求超时事件
const request = (options,isShowLoading=false) => {
	// console.log(app.globalData.baseUrl)
	// console.log(isShowLoading)
	if(isShowLoading){
		uni.showLoading({
			title:'加载中...',
			mask:true,
			success:()=>{
				timer = setTimeout(()=>{
					uni.hideLoading();
					uni.showToast({
						title:'接口超时',
						icon:'none'
					})
				},REQUESTTIMEOUT)
			}
		})
	}
	return new Promise((resolve,reject)=>{
		// console.log(app);
		uni.request({
			url:app.globalData.baseUrl,
			method:options.method,
			data:{
				...options.data,
			},
			header:{
				"accessToken":uni.getStorageSync('accessToken') || null,
				"content-type": "application/json; charset=UTF-8"
			},
			success:res=>{
				// if(res.data.code){
					
				// }
				resolve(res)
			},
			fail:err=>{
				uni.showToast({
					title:'接口请求失败',
					icon:'none',
				})
				reject(err);
			},
			complete:()=>{
				if(isShowLoading){
					uni.hideLoading();
					clearTimeout(timer);
				}
			}
		})
	})
}

//封装get方法
const get = (options = {},isShowLoading) => {
  return request({
    method: 'GET',
    data: options
  },isShowLoading)
}
//封装post方法
const post = (options={},isShowLoading) => {
  return request({
    method: 'POST',
    data: options
  },isShowLoading)
}
module.exports = {
  get,
  post,
}