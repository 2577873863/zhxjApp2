import {get,post} from './request.js';

//登录
const apiLogin = async ( params={} )=>{ 
	return get({
		...params,
		_gp:'user',
		_mt:'loginApp',
	},true);
}
//退出登录
const logout = async params =>{ 
	return get({
		...params,
		_gp:'user',
		_mt:'logout',
	},true);
}

//我的
const apiUserInfo = async params =>{
	return get({
		_gp:'user',
		_mt:'info',
	})
}
//查询所有用户地区部门枚举
const findUserAreaList = async params =>{
	return get({
		...params,
		_gp:'user',
		_mt:'findUserAreaList',
	})
}
//查询所有用户角色枚举
const findUserRoleList = async params =>{
	return get({
		...params,
		_gp:'user',
		_mt:'findUserRoleList',
	})
}
//用户修改密码APP
const resetPassword = async params =>{
	return get({
		...params,
		_gp:'user',
		_mt:'resetPassword',
	})
}

//巡更轨迹
const apiFindGpsTrack = async params =>{
	return get({
		...params,
		_gp:'treak',
		_mt:'findGpsTrack'
	})
}
//查询历史巡更地图分布情况
const apiFindGpsMap = async () =>{
	return get({
		_gp:'info',
		_mt:'findGpsMap'
	})
}
//历史巡更事件
const apiEventList = async params =>{
	return get({
		...params,
		_gp:'info',
		_mt:'eventList'
	},true)
}
//
const apiEventTraceEventById = async params =>{
	return get({
		...params,
		_gp:'info',
		_mt:'eventById'
	})
}


//历史巡更人
const apiEventPersonList = async params =>{
	return get({
		...params,
		_gp:'info',
		_mt:'eventPersonList'
	},true)
}

//分组查询
const findByUserGroupList = async params =>{ 
	return get({
		...params,
		_gp:'group',
		_mt:'findByUserGroupList',
	},true);
}

//获取签名
const apiGetVideoSign = async params => {
	return get({
		...params,
		_gp:'videoSign',
		_mt:'getVideoSign',
	})
}

//查询当天的排版信息
const apiFindByIdSchedule = async params =>{
	return get({
		...params,
		_gp:'checkingIn',
		_mt:'findByIdSchedule',
	})
}

//定位
const apiCreateGps = async params =>{
	return get({
		...params,
		_gp:'checkingIn',
		_mt:'createGps'
	})
}

//上班打卡功能
const apiUpCheckIn = async params =>{
	return get({
		...params,
		_gp:'checkingIn',
		_mt:'upClockIn'
	})
}

//下班打卡
const apiBelowClockIn = async params =>{
	return get({
		...params,
		_gp:'checkingIn',
		_mt:'belowClockIn'
	})
}

//查询录入状态枚举
const findEventEntryStatusList = async params =>{
	return get({
		...params,
		_gp:'event',
		_mt:'findEventEntryStatusList',
	})
}

//查询事件状态枚举
const findEventStateList = async params =>{
	return get({
		...params,
		_gp:'event',
		_mt:'findEventStateList',
	})
}
//查询事件类型枚举
const findEventTypeList = async params =>{
	return get({
		...params,
		_gp:'event',
		_mt:'findEventTypeList',
	})
}

//创建事件
const createEvent = async params =>{
	return get({
		...params,
		_gp:'event',
		_mt:'createEvent',
	})
}
//获取视频房间id
const apiGetRoomId = async () =>{
	return get({
		_gp:'video',
		_mt:'getRoomId',
	})
}


module.exports = {
	apiLogin,
	apiUserInfo,
	apiCreateGps,
	apiFindGpsTrack,
	apiFindGpsMap,
	apiEventList,
	apiEventPersonList,
	logout,
	findByUserGroupList,
	findUserAreaList,
	findUserRoleList,
	resetPassword,
	apiGetVideoSign,
	apiFindByIdSchedule,
	apiUpCheckIn,
	apiBelowClockIn,
	findEventEntryStatusList,
	findEventStateList,
	findEventTypeList,
	createEvent,
	apiGetRoomId,
	apiEventTraceEventById
}