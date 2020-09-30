<template>
  <div class="setPwdWrap">
    <login-tips :tipsType="true"/>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:24px">Set Password</span>
      </div>
      <div class="text item">
        <el-form class="setPwdForm" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"
            show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"
            show-password></el-input>
          </el-form-item>
          <el-form-item label="" prop="agree" class="agreeTips">
            <el-checkbox v-model="ruleForm.checked">
              I have read and accepted the <span class="agreeBlue">TERMS OF USE</span> and <span class="agreeBlue">PRIVACY POLICY</span>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="btnDisabled" :loading="btnLoading" round style="width:100%" type="primary" @click="submitForm('ruleForm')">Sing Up</el-button>
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
  name: 'SetPwd',
  components: {
    LoginTips
  },
  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        pass: '',
        checkPass: '',
        checked: false
      },
      show1: false,
      show2: false,
      rules: {
        pass: [
          { required: true, message: '', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '', trigger: 'blur' }
        ],
      },
      btnLoading: false,
      btnDisabled: false
    };
  },
  mounted(){
    this.btnLoading= false
    this.btnDisabled= false
  },
  methods: {
    ...mapActions(["handleSetPassword","handleRegister"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.ruleForm.pass < 6 || this.ruleForm.checkPass < 6){
            this.$message.error('Password must be at least 6 digits')
          }else if(this.ruleForm.pass !== this.ruleForm.checkPass) {
            this.$message.error('Password mismatch, please verify again')
          }else{
            this.btnLoading= true
            this.handleSubmit()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSubmit(){
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneParams'))
      let registerInfo= JSON.parse(sessionStorage.getItem('registerInfo'))
      registerInfo.Password=this.ruleForm.checkPass
      let finalParams={ ...phoneParams, ...registerInfo}
      console.log("finalParams",finalParams)
      this.handleRegister(finalParams).then(
        res => {
          this.btnLoading= false
          if(res.status == 200 && res.data && res.data.Success){
            // this.$router.push('/updateInfo')
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
.setPwdWrap{
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
    .setPwdForm{
      .el-checkbox__inner{
        border-radius: 50%;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #9B9B9B;
      }
      .el-checkbox{
        color: #9B9B9B;
        display: flex;
        .el-checkbox__input{
          margin-top: 3px;
        }
      }
      .agreeTips{
        font-size: 12px;
        .agreeBlue{
          font-size: 14px;
          color: #50CEC3;
        }
        .el-checkbox__label{
          white-space: initial;
        }
      }
    }
  }
}
</style>
