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
  modifyPassword:{
    url: '/app/user/modify-password',
    type: 'upload',
    params: {
      NewPassword:'',
    }
  },
  resetPassword:{
    url: '/app/user/reset-password-by-sms',
    type: 'upload',
    params: {
      MobileNumber:'',
      Otp:'',
      Password:''
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
