import Req from './Https'
import TempReq from '../Https'

const CalendarUtil = function () {
    const ListenerName = 'CalendarListener';
    // var schemeList = [];
    var schemeKeys = null;
    var appKeys = null;

    const SubType = {
        add: 'ADD',
        update: 'UPDATE',
        delete: 'DELETE'
    };

    const HttpURL = {
        add: '/api/calendar/add',
        update: '/api/calendar/edit',
        delete: '/api/calendar/delete'
    };

    const __init = function (rCallback) {
        __addListener( ListenerName , function (temp) {
            var result = JSON.parse(temp)

            var subType = result.subType || null
            var value = result.data || null
            var listenName = result.listenName || null

            var callback = function (status, data={}, msg='') {
                if (listenName!=null) {
                    __sendData(listenName, __dealResult(status, data, msg))
                }
                if (rCallback) {
                    data.subType = subType;
                    rCallback(__dealResult(status, data, msg))
                }
            }
            // console.log('add listen haha: ', subType, listenName, value);
            if (subType==null || listenName==null || !__checkParams(value, subType)) {
                callback(0, {}, '参数错误')
            } else {
                var params = value
                Req.headers = TempReq.headers
                switch (subType) {
                    //发送http请求
                    case SubType.add: {
                        Req.post(HttpURL.add, params).then(rep=>{
                            if (rep.retcode==1) {
                                params.calendar_id = rep.data.calendar_id;
                                params.ui_id = rep.data.ui_id;
                                callback(1, params)
                            } else {
                                callback(0, rep.data, rep.info)
                            }
                        },err=>{
                            callback(0)
                        })
                        break;
                    }
                    case SubType.update: {
                        Req.post(HttpURL.update, params).then(rep=>{
                            if (rep.retcode==1) {
                                params.ui_id = rep.data.ui_id;
                                callback(1, params)
                            } else {
                                callback(0, rep.data, rep.info)
                            }
                        },err=>{
                            callback(0)
                        })
                        break;
                    }
                    case SubType.delete: {
                        Req.post(HttpURL.delete, params).then(rep=>{
                            if (rep.retcode==1) {
                                callback(1, {calendar_id: params.calendar_id})
                            } else {
                                callback(0, rep.data, rep.info)
                            }
                        },err=>{
                            callback(0)
                        })
                        break;
                    }
                }
            }
        })
    };

    //添加监听
    //callback:function(){}
    const __addListener = function (listenName, callback) {
        window.sys.app.addListener({
            key: listenName,
            name: listenName,
            callback: callback
        })
    };

    //移除监听
    const __removeListener = function (listenName) {
        window.sys.app.removeListenByKey({key:listenName})
    };

    const __openApp = function (scheme) {

    };

    const __sendData = function (listenerName, data) {
        window.sys.global.setGlobalVariable({
            key: listenerName,
            value: JSON.stringify(data)
        });
    };

    const __dealResult = function (status, data='', msg='') {
        return {status:status, data:data, msg:msg}
    };

    const __checkParams = function (params, subType) {
        // return true;

        switch (subType) {
            //发送http请求
            case SubType.add: {
                if (!params.start_at) {
                    alert('start_at字段不能为空');
                }
                if (!params.data) {
                    alert('data字段不能为空');
                }
                if (!params.users) {
                    alert('users字段不能为空');
                }
                if (params.start_at && params.data) {
                    return true;
                }
            }
            case SubType.update: {
                if (!params.calendar_id) {
                    alert('calendar_id字段不能为空');
                }
                if (!params.users) {
                    alert('users字段不能为空');
                }
                if (params.calendar_id) {
                    return true;
                }
            }
            case SubType.delete: {
                if (!params.calendar_id) {
                    alert('calendar_id字段不能为空');
                }
                if (params.calendar_id) {
                    return true;
                }
            }
        }
        return false;
    };

    const __getSchemeList = function () {
        return new Promise((resolve,reject)=>{
            window.sys.communication.getSchemeList({
                callback: function (result) {
                    resolve(result)
                }
            })
        })
    };

    const __getAppList = function () {
        return new Promise((resolve,reject)=>{
            window.sys.mirror.getAppList({
                callback: function (result) {
                    resolve(result)
                }
            })
        })
    };

    const __getAppInfo = function (scheme) {
        if (schemeKeys==null) {
            var schemeList = __getSchemeList();
            schemeList.forEach(function(value){
                schemeKeys[scheme] = value
            })
        }

        if (appKeys==null) {
            var appList = __getAppList();
            appList.forEach(function(value){
                appKeys[appId] = value
            })
        }

        var temp = schemeKeys[scheme]
        if (temp && temp.appId) {
            var info = appKeys[temp.appId]
            info[scheme] = temp
            return info
        }
        return null;
    };

    const __getScheme = function (appId) {
        schemeKeys.forEach(function(value){
            if (value.appId == appId) {
                return value.scheme
            }
        })
        return null
    };

    return {
        init: __init,
        getAppInfo: __getAppInfo,
        getScheme: __getScheme,
        addListener: __addListener,
        removeListener: __removeListener,
        openApp: __openApp
    }
};

export default new CalendarUtil();
