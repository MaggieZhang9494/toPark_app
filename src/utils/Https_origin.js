
import axios from 'axios';
import qs from 'qs';

const NO_TOKEN = [
    '/user/mobile/register/confirm',
    '/oauth/token'
]

const currentUrl = 'https://api.topark.alicloud.group'
// 创建 axios 实例
const service = axios.create({
    baseURL: currentUrl,
    timeout: 45000
})

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('TOKEN')
        // 添加token
        // if(token && !hasUrl(config.url)){
        //     config.headers['Authorization'] = token
        // }
        // 请求发送前进行处理
        return config
    },
    (error) => {
        // 请求错误处理
       console.log('error',error)
    }
)


// 是否正在刷新的标记
let isRefreshing = false
// 刷新token次数
let maxRetry = 0
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

const refreshToken = function () {
    let url = '/api/oauth/token'
    const params = {
        refresh_token: sessionStorage.getItem("TOKEN"),
        client_id: 'dhgx',
        // 固定值
        client_secret: 'dhgx123',
        // 固定值
        grant_type: 'refresh_token',
    }
    isRefreshing = true
    return service({
        method:'post',
        url: currentUrl+url,
        data: params,
        headers: {
            'Content-type': addContentType(url)
        }
    }).then(res=>{
        isRefreshing = false
        return Promise.resolve(res)
    })
}

const errorRidrect = function () {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href=window.location.origin
}

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        let { data } = response
        return data
    },
    (error) => {
        if(error == 'Network Error'){
            reject(new Error('网络请求超时'))
            return false
        }
        let info = {},
        { status, statusText, data } = error.response
        if( status === 401 ){
            const config = error.config
            // 刷新token三次后，再次刷新会返回登录页
            if(maxRetry > 3) return errorRidrect()
            // token刷新期间，缓存其它请求
            if(!isRefreshing){
                return refreshToken().then(res=>{
                    // 如果refresh_token过期，返回登录页
                    if(res.code === -1) {
                        return errorRidrect()
                    }
                    maxRetry++
                    let tokenStr = res.token_type+' '+res.access_token
                    // 重置token、refresh_token
                    localStorage.setItem('DONGHU_TOKEN', tokenStr)
                    sessionStorage.setItem("DONGHU_TOKEN", tokenStr);
                    sessionStorage.setItem("REFRESH_TOKEN", res.refresh_token);
                    // 执行之前失败的请求
                    requests.forEach(cb => cb())
                    // 清空缓存的请求
                    requests = []
                    return service(config)
                })
            }else{
                // 正在刷新token，将返回一个未执行resolve的promise
                return new Promise((resolve) => {
                    // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                    requests.push(() => {
                        resolve(service(config))
                    })
                })
            }
        }
        if( status === 502 ){
            reject('服务器正在更新');
        }
        if (!error.response) {
            info = {
                code: 5000,
                msg: 'Network Error'
            }
            reject(error.response);
        } else {
            reject(error.response);
        }
    }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */

const methods = {
    //get请求
    get(url,param = {}){
        return service({
            method:'get',
            url,
            params:param
        }).then(res=>{
            return res
        }).catch(err=>{
            
        })

    },
    //post请求
    post(url,param = {}){
        return service({
            method:'post',
            url,
            data: rebuildData(url,param),
            headers: {
                'Content-type': addContentType(url)
            }
        }).then(res=>{
            // if(res.code == '-1'){
            //     reject(res)
            // }
            return res
        }).catch(err=>{
            
        })
    },
    // 文件上传
    upload(url, params={}){
      return service({
          method: 'post',
          url,
          data: setFormData(params),
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }).then(res => {
          // if(res.code == '-1'){
          //   this.$message.error(res.msg)
          // }
          return res
      }).catch(err=>{
      })
  },
}

const envGateway = {
    development: '/api',
    production: '/api',
    beta: '/api/beta',
}

const request = function (target, params){
    if(!target) return false
    let targetUrl = target.url
    if(!target.type){
        target.type = 'upload'
    }
    if(target.gateway){
        targetUrl = target.gateway+target.url
    }else{
      targetUrl= target.url
        // targetUrl = envGateway[process.env.NODE_ENV]+target.url
        // if(target.url === '/oauth/token'){
        //     targetUrl = envGateway['production']+target.url
        // }
    }
    return methods[target.type](targetUrl, params)
}

function hasUrl(url){
    return NO_TOKEN.some(item => {
        return url.indexOf(item) != -1
    })
}

function addContentType(url){
    if(url.indexOf('/oauth/token') != -1){
        return 'application/x-www-form-urlencoded'
    }
    return 'application/json'
}

function rebuildData(url,data){
    if(url.indexOf('/oauth/token') != -1){
        return qs.stringify(data)
    }
    return data
}

function setFormData(data){
  let formData = new FormData()
  Object.keys(data).map(key=>{
      if(Array.isArray(data[key])){
          data[key].map((item, index)=>{
              if(typeof item == 'object'){
                  Object.keys(item).map(_key=>{
                      formData.append(key+'['+index+']'+'.'+_key, item[_key])
                  })
              }else{
                  formData.append(key+'['+index+']', item)
              }
          })
          return
      }
      if(data[key] || JSON.stringify(data[key]) == 'false'){
          formData.append(key, data[key])
      }
  })
  return formData
}
export default request



