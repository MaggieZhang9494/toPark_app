import axios from 'axios'
import state from '../store/state'

import Android from '@/utils/Android'

let BASE_URL = 'http://27.17.34.226:28064/api'

const https = {
    post: (api,params)=>{
        api = BASE_URL+api
        let timeOutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('网络请求超时'));
            }, 45000);
        });
        if(window.DEBUG){
            let postReq = new Promise((resolve,reject)=>{
                axios.post(api,params, https.headers).then(rep=>{
                    resolve(rep.data)
                }).catch(err=>{
                    reject(err)
                })
            })
            return Promise.race([timeOutPromise, postReq]);
        }
        let appPost = new Promise((resolve,reject)=>{
            window.app.request.post({
                url:api,
                data:params,
                timeout: 50000,
                headers: https.headers,
                success:function(res){
                    console.log('res', res)
                    try {
                        var result = JSON.parse(res)
                        resolve(result)
                    } catch (e) {
                        reject('数据加载失败');
                    }
                },
                fail:function(res){
                    reject('数据加载失败');
                }
            });
        })
        return Promise.race([timeOutPromise, appPost]);
    },
    get: (api,params)=>{
        api = BASE_URL+api

        let timeOutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('网络请求超时'));
            }, 45000);
        });
        if(window.DEBUG){
            let getReq = new Promise((resolve,reject)=>{
                axios.get(api,{params: params,headers: https.headers}).then(rep=>{
                    resolve(rep.data)
                }).catch(err=>{
                    reject(err)
                })
            })

            return Promise.race([timeOutPromise, getReq]);
        }
        let appGet = new Promise((resolve,reject)=>{
            window.app.request.get({
                url: api,
                data: params,
                timeout: 50000,
                headers: https.headers,
                success:function(res){
                    try {
                        var result = JSON.parse(res)
                        if (result.flag==1) {
                            resolve(result);
                        } else {
                            reject(result.message?result.message:'数据加载失败');
                        }
                    } catch (e) {
                        reject('数据加载失败');
                    }
                },
                fail:function(res){
                    reject('数据加载失败');
                }
            });
        })
        return Promise.race([timeOutPromise, appGet]);
    }
}

export default https;
