<template>
  <div class="registerWrap">
    <login-tips :tipsType="true"/>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:24px">Sign Up</span>
        <el-button style="float: right;font-size:14px;color:#cdcdcd;" type="text"
        @click="toLogin">Sign In</el-button>
      </div>
      <div class="text item">
        <el-form class="registerForm" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="" class="leftSelect">
            <el-select v-model="ruleForm.CountryCode" placeholder="">
              <el-option v-for="(item, index) in codeSelect" :label="'+'+item" :value="item" :key="index+'selectRegister'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Phone" prop="MobileNumber" class="rightInput">
            <el-input v-model="ruleForm.MobileNumber"></el-input>
          </el-form-item>
          <el-row style="align-items: center;display: flex;">
            <el-col :span="12">
              <el-form-item label="One Time Password" prop="Otp">
                <el-input type="Otp" v-model="ruleForm.Otp" autocomplete="off"></el-input>
              </el-form-item></el-col>
            <el-col :span="12">
              <div class="timeCall">after {{send.times}} seconds</div>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button :disabled="btnDisabled" :loading="btnLoading" style="width:100%" round type="primary" @click="submitForm('ruleForm')">Next step</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 密码不一致，密码少于6位，号码已注册
import LoginTips from '../../components/login/LoginTips'
import ruler from '@/utils/ruler.js'
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  components: {
    LoginTips
  },
  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        MobileNumber: '',
        Otp: '',
        CountryCode: ''
      },
      codeSelect: [],
      rules: {
        MobileNumber: [
          { required: true, message: '', trigger: 'blur' }
        ],
        Otp: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      send: {
        status: false,
        times: 59,
      },
      resetTime:false,
      btnLoading: false,
      btnDisabled: true
    };
  },
  computed: {
    newMobileNumber() {
      return this.ruleForm.MobileNumber;
    },
    newOtp() {
      return this.ruleForm.Otp;
    }
  },
  watch: {
    newMobileNumber(val) {
      if(ruler.mobile.test(this.ruleForm.MobileNumber)){
        this.getOtp()
      }else{
        this.resetTime= true
      }
    },
    newOtp(val) {
      if(val.length){
        this.btnDisabled= false
      }
    }
  },
  mounted(){
    this.btnDisabled= true
    this.getCodeSelect()
  },
  methods: {
    ...mapActions(["handleRegister","registerSendMsg","handleGetCodeSelect",'handleGetRegisterOtp']),
    getCodeSelect() {
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneParams'))
      console.log("phoneParams",phoneParams)
      this.handleGetCodeSelect(phoneParams).then(
        res => {
          if(res.status == 200 && res.data && res.data.Success){
            if(res.data.Data && res.data.Data.List && res.data.Data.List.length){
              let currentCode=[]
              res.data.Data.List.map((item,index)=>{
                if(index==0){
                  this.ruleForm.CountryCode= item.CountryCode
                }
                currentCode.push(item.CountryCode)
              })
              console.log("currentCode",currentCode)
              this.codeSelect= currentCode
            }
          }else if(res.data){
            this.$message.error(res.data.ErrorMessage)
          }else{
            this.$message.error('Something is wrong')
          }
        },
        res => {
          console.log("err",res)
        }
      );
    },
    getOtp: function(){
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneParams'))
      phoneParams.CountryCode= this.ruleForm.CountryCode
      phoneParams.MobileNumber= this.ruleForm.MobileNumber
      this.handleGetRegisterOtp(phoneParams).then(
        res => {
          if(res.status == 200 && res.data && res.data.Success){
            this.$message.success('Otp has been sent successfully')
            this.resetTime= false
            this.onTimeChange()
          }else if(res.data){
            this.$message.error(res.data.ErrorMessage)
          }else{
            this.$message.error('Something is wrong')
          }
        },
        res => {
          console.log("err",res)
        }
      );
    },
    /**定时器 */
    onTimeChange(){
      let { times } = this.send
      this.send={
          status: true,
          times: times,
      }
      let timer = setInterval(()=>{
        console.log("times",times)
        console.log("this.resetTime",this.resetTime)
        if(times<=0 || this.resetTime){
          clearInterval(timer)
          this.send={
            status: false,
            times: 59
          }
          return false
        }
        times--
        this.send={
          status: true,
          times: times,
        }
        console.log(2)
      },1000)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!ruler.mobile.test(this.ruleForm.MobileNumber)){
            this.$message.error('Something’s wrong with your number');
          }else{
            this.btnDisabled= false
            this.handleSubmit()
          }
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    handleSubmit(){
      if(!this.ruleForm.CountryCode){
        this.$message.error('Something’s wrong with countryCode');
        return false
      }else{
        sessionStorage.setItem('registerInfo',JSON.stringify(this.ruleForm))
        this.resetTime= true
        this.$router.push('/setPwd')
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(formName) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.registerWrap{
  display: flex;
  flex-direction: column;
  .el-card{
    margin: 15px 18px;
    .el-card__header{
      padding-bottom: 0;
    }
    .el-card__body{
      padding: 15px 20px;
    }
    .registerForm{
      position: relative;

      .leftSelect{
        width: 70px;
        position: absolute;
        top: 29px;
        left: 10px;
        z-index: 999;
        background-color: #E9EDEF;
        border-radius: 40px;
        .el-input--suffix .el-input__inner{
          padding-right: 0;
        }
        .el-form-item__content{
          line-height: 38px;
          .el-select{
            line-height: 38px;
          }
        }
        .el-input__inner{
          background-color: #E9EDEF;
          height: 28px;
          border: none;
          border-right: 1px solid rgba(138,143,152,0.17);
          border-radius: 0;
        }
        // .el-input__icon{
        //   display: none;
        // }
      }

      .rightInput{
        .el-input__inner{
          padding-left: 85px;
        }
      }

      .timeCall{
        float: right;
        font-size: 16px;
        font-family: Montserrat;
        font-weight: 550;
        line-height: 18px;
        color: #50CEC3;
      }

    }

  }
}
</style>