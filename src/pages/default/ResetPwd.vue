<template>
  <div class="resetPwdWrap">
    <login-tips :tipsType="true"/>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:24px">Reset Password</span>
      </div>
      <div class="text item">
        <el-form class="registerForm" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-row style="align-items: center;display: flex;">
            <el-col :span="12">
              <el-form-item label="One Time Password" prop="Otp">
                <el-input v-model="ruleForm.Otp" autocomplete="off"></el-input>
              </el-form-item></el-col>
            <el-col :span="12">
              <div class="timeCall">after {{send.times}} seconds</div>
            </el-col>
          </el-row>
          <el-form-item label="New Password" prop="NewPassword">
            <el-input type="password" v-model="ruleForm.NewPassword" autocomplete="off"
            show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm New Password" prop="confirmPwd">
            <el-input type="password" v-model="ruleForm.confirmPwd" autocomplete="off"
            show-password></el-input>
          </el-form-item>
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
  name: 'ResetPwd',
  components: {
    LoginTips
  },
  data() {
    return {
      labelPosition: 'top',
      time: 59,
      ruleForm: {
        Otp: '',
        NewPassword: '',
        confirmPwd: '',
      },
      rules: {
        NewPassword: [
          { required: true, message: '', trigger: 'blur' },
        ],
        confirmPwd: [
          { required: true, message: '', trigger: 'blur' },
        ],
        Otp: [
          { required: true, message: '', trigger: 'blur' },
        ],
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
    newConfirmPwd() {
      return this.ruleForm.confirmPwd;
    }
  },
  watch: {
    newConfirmPwd(val) {
      if(val){
        this.btnDisabled= false
      }else{
        this.btnDisabled= true
      }
    }
  },
  mounted() {
    this.btnDisabled= true
    this.sendSms()
  },
  methods: {
    ...mapActions(["handleGetResetOtp","handleResetPasswordSms"]),
    sendSms: function(){
      let resetInfo= JSON.parse(sessionStorage.getItem('ResetInfo'))
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneParams'))
      let finalParams={ ...phoneParams,  ...resetInfo }
      this.handleGetResetOtp(finalParams).then(
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
        console.log("valid",valid)
        if (valid) {
          if(this.ruleForm.NewPassword.length < 6 || this.ruleForm.confirmPwd.length < 6){
            this.$message.error('Password must be at least 6 digits')
          }else if(this.ruleForm.NewPassword !== this.ruleForm.confirmPwd) {
            this.$message.error('Password mismatch, please verify again')
          }else{
            this.btnDisabled= false
            this.handleSubmit()
          }
        } else {
          this.$message.error('error submit!!');
          return false;
        }
      });
    },
    handleSubmit(){
      console.log("111")
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneParams'))
      let resetInfo= JSON.parse(sessionStorage.getItem('ResetInfo'))
      let currentForm={
        Password: this.ruleForm.confirmPwd,
        Otp: this.ruleForm.Otp
      }
      let finalParams={ ...phoneParams, ...currentForm, ...resetInfo }
      console.log("finalParams",finalParams)
      this.handleResetPasswordSms(finalParams).then(
        res => {
          if(res.status == 200 && res.data && res.data.Success){
            this.$message.success('Password changed successfully, please log in')
            this.resetTime= true
            sessionStorage.removeItem('ResetInfo')
            this.$router.push('/login')
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less">
.resetPwdWrap{
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