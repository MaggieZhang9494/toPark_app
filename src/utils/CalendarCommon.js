let CalendarUUID = "5781ba16ce781da49def23d8f5d776d6"

const CalendarCommon = function () {
    const ListenerName = 'CalendarListener';
    const ReceiveListenerName = 'ReceiveCalendarListener_'+CalendarUUID;

    var settingData = {
        calendarUUID: CalendarUUID
    };

    const SubType = {
        add: 'ADD',
        update: 'UPDATE',
        delete: 'DELETE'
    };

    const __handle = function (data, subType, callback) {
        if (!settingData.calendarUUID) {
            if (callback) {
                callback({status:0, msg:'参数错误，calendarUUID的值请不要修改'});
            }
            return;
        }

        let handleFunc = function () {
            data.calendar_uuid = CalendarUUID

            __addListener(function (result) {
                __removeListener()
                if (callback) {
                    //回调
                    try {
                        callback(JSON.parse(result));
                    } catch (e) {
                        callback({status:0, msg:'失败'})
                        console.log("callback error : ", e);
                    }
                }
            })

            //上传到服务器，然后通知
            var value = {
                subType: subType,
                data: data,
                listenName: ReceiveListenerName
            }
            window.sys.global.setGlobalVariable({
                key: ListenerName,
                value: JSON.stringify(value)
            });
        }

        /**
         *
         * 检查日历应用是否安装
         *
         * */
        window.app.communication.canOpenURL({
            url : 'SysCalendar://',
            callback: function (res) {
                if (res.status != 1) {
                    if (callback) {
                        callback({status:0, msg:'没有安装日历应用，不支持写到日历', data:{}});
                    } else {
                        handleFunc()
                    }
                } else {
                    handleFunc()
                }
            }
        })
    };

    const __addListener = function (callback) {
        window.sys.app.addListener({
            key: ReceiveListenerName,
            name: ReceiveListenerName,
            callback: callback
        })
    };

    //移除监听
    const __removeListener = function () {
        window.sys.app.removeListenByKey({key:ReceiveListenerName})
    };

    //设置日历的uuid值
    const __setCalendarUUID = function (uuid) {
        settingData.calendarUUID = uuid;
    };

    const __setup = function (data) {
        settingData = data;
    };

    /**
     * 添加数据到日历中
     * @param params
     * @param params.start_at     timestamp    必须     开始时间，10位时间戳（deadline_at）
     * @param params.alert_at     timestamp    非必须   提醒时间，10位时间戳
     * @param params.is_done      int          非必须   0 未完成，1 已完成，2 无
     * @param params.data         json string  非必须   UI显示需要用到的数据，里面数据结构自定义
     *          { task_name:'xxx', date:'10月08 周一 16:00', 'done_person_count':0, 'exec_person_count':3, 'is_done':0}
     *          task_name: 任务名字，date：使用deadline_at转换成上面的格式，done_person_count：已完成人数，exec_person_count 执行人数量，is_done 所有人都完成了就是1 否则为0
     * @param params.custom_data  json string  非必须   自定义信息，日历模块不会用到，一般用于小程序编辑时恢复数据用，例如： {task_id:xxx} task_id为任务的id
     * @param params.users        json string  非必须   用户id数组，json encode后得到字符串
     * @param callback {status:0, data:{}, msg:''}  status:1 成功，0失败；data.calendar_id:如果调用成功，会返回calendar_id，如需要编辑日历数据，小程序要将此值保存下来；
     * @private
     */
    const __add = function (params, callback) {
        params = params || {}
        params.users = params.users || JSON.stringify([])
        __handle(params, SubType.add, callback)
    };

    /**
     * 更新日历中的数据
     * @param params
     * @param params.calendar_id  string       必须
     * @param params.start_at     timestamp    非必须   开始时间，10位时间戳（deadline_at）
     * @param params.alert_at     timestamp    非必须   提醒时间，10位时间戳
     * @param params.is_done      int          非必须   0 未完成，1 已完成，2 无
     * @param params.data         json string  非必须   UI显示需要用到的数据，里面数据结构自定义
     *          { task_name:'xxx', date:'10月08 周一 16:00', 'done_person_count':0, 'exec_person_count':3, 'is_done':0}
     *          task_name: 任务名字，date：使用deadline_at转换成上面的格式，done_person_count：已完成人数，exec_person_count 执行人数量，is_done 所有人都完成了就是1 否则为0
     * @param params.custom_data  json string  非必须   自定义信息，日历模块不会用到，一般用于小程序编辑时恢复数据用，例如： {task_id:xxx} task_id为任务的id
     * @param params.users        json string  必须     用户id数组，json encode后得到字符串
     * @param callback {status:0, data:{}, msg:''}  status:1 成功，0失败；
     * @private
     */
    const __update = function (params, callback) {
        params = params || {}
        params.users = params.users || JSON.stringify([])
        __handle(params, SubType.update, callback)
    };

    /**
     * 删除日历中的数据
     * @param params
     * @param params.calendar_id  string       必须
     * @param callback {status:0, data:{}, msg:''}  status:1 成功，0失败；
     * @private
     */
    const __delete = function (params, callback) {
        __handle(params, SubType.delete, callback)
    };

    return {
        add: __add,
        update: __update,
        delete: __delete
    }
};

export default new CalendarCommon();
