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
              <el-option label="+86" value="86"></el-option>
              <el-option label="+83" value="83"></el-option>
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
            <el-button style="width:100%" round type="primary" @click="submitForm('ruleForm')">Next step</el-button>
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
        MobileNumber: '13555555555',
        Otp: '999999',
        CountryCode: '86'
      },
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
    };
  },
  computed: {
    newMobileNumber() {
      return this.ruleForm.MobileNumber;
    }
  },
  watch: {
    newMobileNumber(val) {
      if(ruler.mobile.test(this.ruleForm.MobileNumber)){
        this.checkPhone()
      }else{
        this.resetTime= true
      }
    }
  },
  mounted(){
    this.getCodeSelect()
  },
  methods: {
    ...mapActions(["handleRegister","registerSendMsg","handleGetPhoneCheck","handleGetCodeSelect"]),
    getCodeSelect() {
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneInfo'))
      this.handleGetCodeSelect(phoneParams).then(
        res => {
          console.log("success",res)
        },
        res => {
          console.log("err",res)
        }
      );
    },
    checkPhone() {
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneInfo'))
      let currentParams={
        CountryCode: this.ruleForm.CountryCode,
        MobileNumber: this.ruleForm.MobileNumber
      }
      let finalParams={ ...phoneParams, ...currentParams}
      console.log("finalParams",finalParams)
      this.handleGetPhoneCheck(finalParams).then(
        res => {
          this.resetTime= false
          this.sendSms()
        },
        res => {
          this.$message.error('Hmm.. This number is already registered.');
        }
      );
    },
    sendSms: function(){
      console.log(1)
      this.onTimeChange()
      // this.registerSendMsg({mobile: this.ruleForm.MobileNumber}).then(res=>{
      //     if(res.code !== -1){
      //     }else{
      //       this.resetTime = true
      //     }
      // })
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
            this.handleSubmit()
          }
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    handleSubmit(){
      sessionStorage.setItem('registerInfo',JSON.stringify(this.ruleForm))
      this.$router.push('/setPwd')
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
          border-right: 1px solid #8A8F98;
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