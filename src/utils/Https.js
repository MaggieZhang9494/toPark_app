// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import qs from 'qs'; // 引入qs模块，用来序列化post类型的数据

let currentUrl=  ''
if (process.env.NODE_ENV == 'development') {    
  currentUrl = 'https://api.topark.alicloud.group'} 
else if (process.env.NODE_ENV == 'production') {    
  currentUrl = 'https://api.topark.alicloud.group'
}

// 创建 axios 实例
const service = axios.create({
  baseURL: currentUrl,
  timeout: 45000
})
const request = function (target, params){
  if(!target) return false
  let targetUrl = target.url
  if(!target.type){
    target.type = 'upload'
  }
  return methods[target.type](targetUrl, params)
}
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // 请求错误处理
    console.log('error',error)
  }
)
// 响应拦截器
service.interceptors.response.use(    
  response => {   
    return response 
  },
  error => {            
    if (error.response.status) {            
      switch (error.response.status) {                
        case 401:                    
          router.replace({                        
            path: '/login',                        
            query: { 
              redirect: router.currentRoute.fullPath 
            }
          });
        break;                
        case 403:
          this.$message.error('登录过期，请重新登录')
          // 清除token
          localStorage.clear();
          sessionStorage.clear();
          router.replace({                            
            path: '/login',                            
            query: { 
              redirect: router.currentRoute.fullPath 
            }                        
          });                    
          break; 
        // 404请求不存在
        case 404:
          this.$message.error('网络请求不存在')
          break;
        // 其他错误，直接抛出错误提示
        default:
          this.$message.error(error.response.data.message)
      }
      return Promise.reject(error.response);
    }
  }
)    
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
      url: url + '?' + qs.stringify(params),
      data: setFormData(params),
      headers: {
        // 'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/x-www-form-urlencoded'
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

function rebuildData(url,data) {
  if(url.indexOf('/oauth/token') != -1){
    return qs.stringify(data)
  }
  return data
}

function addContentType(url) {
  if(url.indexOf('/oauth/token') != -1){
    return 'application/x-www-form-urlencoded'
  }
  return 'application/json'
}
function setFormData(data){
  let formData = new FormData()
  Object.keys(data).map(key=>{
    console.log("data[key]",data[key])
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
  console.log("finalformData",formData)
  return formData
}
export default request