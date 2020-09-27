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
    handleGetPhoneCheck({commit}, params){
      let currentApi = Api.phoneCheck
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
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
    handleResetPassword({commit}, params){
      let currentApi = Api.resetPassword
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
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
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    handleUpdateAvatar({commit}, params){
      let currentApi = Api.updateProfile
      return new Promise((resolve, reject)=>{
          Req(currentApi,{...params}).then(rep=>{
              resolve(rep)
          },err=>{
              reject(err)
          })
      })
    },
    handleGetProfile({commit}){
        let currentApi = Api.getProfile
        return new Promise((resolve, reject)=>{
            Req(currentApi).then(rep=>{
                commit('USER_PROFILE', rep)
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
                resolve(rep)
            },err=>{
                reject(err)
            })
        })
    },
}
