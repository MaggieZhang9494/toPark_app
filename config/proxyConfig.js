module.exports = {
    proxy: {
        '/api': {    
            target: 'http://10.6.18.35:8005',  // 接口域名
            // target: 'http://moa.haoqitech.com.cn',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: { 
                '^/api': '/api' 
            }
        }
    }
  }