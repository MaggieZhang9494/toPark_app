export default {
    login:{
        url: '/oauth/token',
        type: 'post',
        params: {
            username:'',
            password:'',
            client_id:'dhgx',
            client_secret:'dhgx123',
            grant_type:'password',
        }
    },
    /**注册--短信验证 */
    registerMobilMsg: {
        url: '/user/mobile/register/sms',
        type: 'post',
        params: {
            mobile: ''
        }
    },
    /**注册--提交 */
    registerSave: {
        url: '/user/mobile/register/confirm',
        type: 'post',
        params: {
            "name": "企业名称",
            "mobile": "手机号码",
            "type": "主体性质：1：个体工商户；2：企业单位",
            "password": "密码",
            "passwordConfirm": "确认密码",
            "smsCodeKey": "发送验证码返回的key",
            "smsCode": "短信验证码",
            "agree": "是否同意协议",
            "park":""
        }
    },
    /**忘记密码--短信验证 */
    forgetMobileMsg: {
        url: '/user/mobile/password/forget/sms',
        type: 'post',
        params: {
            mobile: ''
        }
    },
    /**忘记密码--确认重置 */
    forgetSave: {
        url: '/user/mobile/password/forget/reset',
        type: 'post',
        params: {
            "mobile": "手机号码",
            "password": "密码",
            "passwordConfirm": "确认密码",
            "smsCodeKey": "发送验证码返回的key",
            "smsCode": "短信验证码"
        }
    },
    confirm: {
        url: '/user/enterprise/authorize',
        type: 'post',
        params: {
            enterpriseName: '请输入正确的企业名称',
            unifiedSocialCreditCode: '请输入正确的社会统一信用代码',
            legalRepresentativeName: '请输入正确的法人姓名',
            legalRepresentativeIdentityCode: '请输入正确的证件号码',
            isAgree:''
        }
    },
    getUserInfo:{
        url:'/user/enterprise/info',
        type: 'post',
    },
    getSelect: {
        url:'/user/park/select',
        type: 'post',
    }
}
