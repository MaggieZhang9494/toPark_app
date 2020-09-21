var HeartbeatNamePrefix = "Task"
var HeartbeatName = ""
var AppKey = "task_key"
var AppSecret = "task_secret"

const android = {

    /**
     * 关闭
     */
    close: function(){
        // window.app.app.closeApp()
        window.app.ext.exit()
    },

    /**
     *授权
     */
    authorize: function () {
        return new Promise((resolve,reject)=>{
            console.log('执行window.sys.oauth.authorize')
            window.sys.oauth.authorize({
                appKey: AppKey,
                appSecret: AppSecret,
                callback: function (res) {
                    HeartbeatName = HeartbeatNamePrefix + res.data.openId
                    resolve(res)
                }
            })

        })
    },

    /**
     * 注册心跳
     * */
    registerHeartbeat: function (callback) {
        window.app.heartbeat.registerHeartbeat({
            key: HeartbeatName,
            name: HeartbeatName,
            callback: function (res) {
                // res {status:1, data:}
            }
        })
    },

    getImageInfo: function (appId, callback) {
        window.sys.mirror.getImageInfo({
            appId: appId,
            callback: callback
        })
    },

    removeHeartbeat: function () {
        window.app.heartbeat.removeHeartbeat({
            key: HeartbeatName
        })
    },

    getPageParams: function () {
        return new Promise((resolve,reject)=>{
            window.app.page.getPageParams({
                callback: function (res) {
                    resolve(res)
                }
            })
        })
    },

    /**
     * 创建群组
     * userIds ： array 执行人id
     * */
    createGroup: function (userIds, groupName,callback) {
        window.sys.group.createGroup({
            user_ids: userIds,
            group_name: groupName,
            callback: callback
        })
    },

    /**
     *
     * 选择执行人
     * params: userSelected: 默认选中的用户 id（详情界面中返回的执行人数据）
     * */
    startContactMulitSelector: function (userSelected,callback) {
        window.app.widget.startContactMulitSelector({
            params:{userSelected: userSelected},
            callback: function (res) {
                console.log('contact selectore: ', res)
                if (res && res.persons) {
                    callback(res.persons)
                } else {
                    callback([])
                }
            }
        })
    },

    /**
     * 获取执行人的具体头像、名字信息
     * params：userIds，（详情界面中返回的执行人数据）
     * */
    getUsersInfo: function (userIds,callback) {
        console.log('get users info')
        try {
            window.sys.user.getUsersInfo({
                userIds: userIds,
                callback: function (res) {
                    console.log('get users info: ', res)
                    callback(res)
                }
            })
        } catch (e) {
            console.log('userin: ', e)
        }
    },

    /**
     * 发送任务消息
     *
     * @params: data object
     * data.task_name  string
     * data.detail  string
     * data.task_id string
     *
     * */
    forward: function (data,callback) {
        var url = 'SysTask://detail?isWidget=1'
        window.app.widget.sendMessage({
            msg:{
                type:'task',
                content: {
                    type: 'miniprogram',
                    content: {
                        title: data.task_name,
                        detail: data.detail,
                        url: url,
                        startPageUrl: 'index.html#/detail?id='+data.task_id
                    },
                    extend: {
                        appId: AppKey
                    }
                }
            },
            callback: function (res) {
                callback(1)
            }
        })
    },

    getEnterMes(){
        return new Promise((resolve,reject)=>{
            console.log('getEnterMes==>getPageParams')
            console.log('window.app',window.app)
            window.app.page.getPageParams({
                callback: function (res) {
                    resolve(res)
                }
            })
        })
    }
}


export default android;
