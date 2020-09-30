export default {
  // 注册
  login:{
    url: '/app/user/login',
    type: 'upload',
    params: {
      Version:'',
      Timestamp:'',
      Longitude:'',
      Latitude:'',
      OS:'',
      OSVersion:'',
      Manufacturer:'',
      PhoneModel:'',
      Resolution:'',
      CountryCode:'',
      MobileNumber:'',
      Password:''
    }
  },
  logOut:{
    url: '/app/user/logout',
    type: 'upload',
    params: {
    }
  },
  countrySelect: {
    url:'/app/country/get-list',
    type: 'upload',
  },
  register:{
    url: '/app/user/register',
    type: 'upload',
    params: {
      CountryCode:'',
      MobileNumber:'',
      Password:'',
      Otp:''
    }
  },
  // 修改密码
  modifyPassword:{
    url: '/app/user/modify-password',
    type: 'upload',
    params: {
      NewPassword:'',
    }
  },
  // 使用短信重置密码
  resetPasswordSms:{
    url: '/app/user/reset-password-by-sms',
    type: 'upload',
    params: {
      MobileNumber:'',
      Otp:'',
      Password:''
    }
  },
  // 发送注册短信
  getRegisterOtp:{
    url: '/app/sms/get-register-otp',
    type: 'upload',
    params: {
      MobileNumber:'',
      CountryCode:''
    }
  },
  // 发送重置密码短信
  getResetOtp:{
    url: '/app/sms/get-reset-password-otp',
    type: 'upload',
    params: {
      MobileNumber:'',
      CountryCode:''
    }
  },
  uploadAvatar:{
    url: '/app/user/upload-avatar',
    type: 'upload',
    params: {
      Resource:'',
    }
  },
  getProfile:{
    url: '/app/user/get-profile',
    type: 'upload',
    params: {
    }
  },
  updateProfile:{
    url: '/app/user/update-profile',
    type: 'upload',
    params: {
      Avatar:'',
      Gender:'',
      FirstName:'',
      LastName:'',
      Salutation:'',
      Birthday:'',
      Email:'',
      Address:'',
    }
  }
}
