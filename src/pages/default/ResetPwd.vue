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
              <div class="timeCall">after {{time}} seconds</div>
            </el-col>
          </el-row>
          <el-form-item label="New Password" prop="newPwd">
            <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off"
            show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm New Password" prop="confirmPwd">
            <el-input type="password" v-model="ruleForm.confirmPwd" autocomplete="off"
            show-password></el-input>
          </el-form-item>
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
        newPwd: '',
        confirmPwd: '',
        MobileNumber:'',
        CountryCode:''
      },
      rules: {
        newPwd: [
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
    };
  },
  mounted() {
    let resetInfo= JSON.parse(sessionStorage.getItem('ResetInfo'))
    this.ruleForm.MobileNumber= resetInfo.MobileNumber
    this.ruleForm.CountryCode= resetInfo.CountryCode
    this.resetTime= false
    this.sendSms()
  },
  methods: {
    ...mapActions(["handleModifyPassword"]),
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
          if(this.ruleForm.newPwd < 6 || this.ruleForm.confirmPwd < 6){
            this.$message.error('Password must be at least 6 digits')
          }else if(this.ruleForm.newPwd !== this.ruleForm.confirmPwd) {
            this.$message.error('Password mismatch, please verify again')
          }else{
            this.handleSubmit()
          }
        } else {
          console.log('error submit!!');
            this.$message.error('错了哦，这是一条错误消息');
            return false;
        }
      });
    },
    handleSubmit(){
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneParams'))
      let ruleParams=this.ruleForm
      let finalParams={ ...phoneParams, ...ruleParams}
      console.log("finalParams",finalParams)
      this.handleModifyPassword(finalParams).then(
        res => {
          if(res.status == 200 && res.data && res.data.Success){
            this.$router.push('/login')
          }else if(res.data){
            this.$message.error(res.data.ErrorMessage)
          }else{
            this.$message.error('Something is wrong')
          }
          // this.$router.push('/updateInfo')
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