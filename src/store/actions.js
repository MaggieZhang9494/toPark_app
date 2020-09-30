import Req from '@/utils/Https';
import Api from '@/utils/Api';

export default {
    testVuex({commit},params){
        commit('TEST',1)
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
     * 登出
     */
    handleLogOut({commit}, params){
        let currentApi = Api.logOut
        return new Promise((resolve, reject)=>{
            Req(currentApi,{...params}).then(rep=>{
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
    handleGetCodeSelect({commit}, params){
      let currentApi = Api.countrySelect
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
            commit('COMMON_COUNTRY_SELECT', rep)
            resolve(rep)
          },err=>{
            reject(err)
          })
      })
    },
    handleRegister({commit}, params){
      let currentApi = Api.register
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
            resolve(rep)
          },err=>{
            reject(err)
          })
      })
    },
    handleSetPassword({commit}, params){
      let currentApi = Api.resetPassword
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    // 修改密码
    handleModifyPassword({commit}, params){
      let currentApi = Api.modifyPassword
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    // 使用短信重置密码
    handleResetPasswordSms({commit}, params){
      let currentApi = Api.resetPasswordSms
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    // 发送注册短信
    handleGetRegisterOtp({commit}, params){
      let currentApi = Api.getRegisterOtp
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    // 发送重置密码短信
    handleGetResetOtp({commit}, params){
      let currentApi = Api.getResetOtp
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    handleGetProfile({commit}, params){
      let currentApi = Api.getProfile
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
              commit('USER_PROFILE', rep)
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    handleUploadAvatar({commit}, params){
      let currentApi = Api.uploadAvatar
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
            console.log("rep",rep)
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    handleUpdateProfile({commit}, params){
      let currentApi = Api.updateProfile
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    handleUpdateProfile({commit}){
        let currentApi = Api.updateProfile
        return new Promise((resolve, reject)=>{
            Req(currentApi).then(rep=>{
              commit('UPDATE_USER_RESULT', rep)
              resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
}
