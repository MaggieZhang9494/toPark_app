import axios from 'axios'

const BASE_URL = 'http://10.6.9.210:1011'
// const BASE_URL = 'http://moa.haoqitech.com.cn'
// const BASE_URL = 'http://47.97.103.123:8003'

const https = {
    headers: {
        ACCESSTOKEN: undefined,
        USERID: undefined
    },
    post: (api,params)=>{
        // console.log('post post aaa')
        api = BASE_URL+api
        // console.log('post post aaa: ', api)

        let timeOutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('网络请求超时'));
            }, 45000);
        });
        if(window.DEBUG){
            let postReq = new Promise((resolve,reject)=>{
                axios.post(api,params,https.headers).then(rep=>{
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
                headers: this.headers,
                success:function(res){
                  resolve(JSON.parse(res));
                },
                fail:function(res){
                    reject(res);
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
                headers: this.headers,
                success:function(res){
                  resolve(JSON.parse(res));
                },
                fail:function(res){
                    reject(res);
                }
            });
        })
        return Promise.race([timeOutPromise, appGet]);
    }
}

export default https;
