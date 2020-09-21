import Req from '@/utils/Https';
import Api from '@/utils/Api';

export default {
    testVuex({commit},params){
        commit('TEST',1)
    },
    /**
     * 保存状态栏高度
     */
    saveStatusBar({commit}, height){
        commit('STATUS_HEIGHT', height)
    },
    handleLogin({commit}, params){
        let login = Api.login
        return new Promise((resolve, reject)=>{
            Req(login,{...params}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
    /**
     * 注册--发送手机验证码
     */
    registerSendMsg({commit}, params){
        let registerMobilMsg = Api.registerMobilMsg
        return new Promise((resolve, reject)=>{
            Req(registerMobilMsg,{...params}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
    /**
     * 注册--保存
     */
    registerSave({commit}, params){
        let registerSave = Api.registerSave
        return new Promise((resolve, reject)=>{
            Req(registerSave,{...params}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
    /**
     * 忘记密码--发送手机验证码
     */
    forgetSendMsg({commit}, params){
        let forgetMobileMsg = Api.forgetMobileMsg
        return new Promise((resolve, reject)=>{
            Req(forgetMobileMsg,{...params}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
    /**
     * 忘记密码--提交
     */
    forgetSave({commit}, params){
        let forgetSave = Api.forgetSave
        return new Promise((resolve, reject)=>{
            Req(forgetSave,{...params}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
    /**
     * 认证--提交
     */
    submitConfirm({commit}, params){
        let confirmSave = Api.confirm
        return new Promise((resolve, reject)=>{
            Req(confirmSave,{...params}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
    getSelect({commit}){
        let select = Api.getSelect
        return new Promise((resolve, reject)=>{
            Req(select).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
    getUserInfo({commit}){
        let select = Api.getUserInfo
        return new Promise((resolve, reject)=>{
            Req(select).then(rep=>{
                if(rep.code !== -1){
                    commit('USER_DETAIL', rep.data)
                }
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
}
