<template>
  <div class="loginWrap">
    <login-tips :tipsType="false"/>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:24px">Sign In</span>
        <el-button style="float: right;font-size:14px;color:#cdcdcd;" type="text"
        @click="toRegister">Sign Up</el-button>
      </div>
      <div class="text item">
        <el-form class="loginForm" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="" class="leftSelect">
            <el-select v-model="ruleForm.CountryCode" placeholder="">
              <el-option label="+86" value="86"></el-option>
              <el-option label="+83" value="83"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Phone" prop="MobileNumber" class="rightInput">
            <el-input v-model="ruleForm.MobileNumber"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="Password">
            <el-input type="password" v-model="ruleForm.Password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" round type="primary" @click="submitForm('ruleForm')">Next step</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div style="text-align:center" @click="toReset">Forgot your password?</div>
  </div>
</template>

<script>
// 密码不一致，密码少于6位，号码已注册
import LoginTips from '../../components/login/LoginTips'
import ruler from '@/utils/ruler.js'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {
    LoginTips
  },
  data() {
    return {
      labelPosition: 'top',
      time: 59,
      ruleForm: {
        MobileNumber: '',
        Password: '',
        CountryCode: '86'
      },
      rules: {
        MobileNumber: [
          { required: true, message: '', trigger: 'blur' },
        ],
        Password: [
          { required: true, message: '', trigger: 'blur' },
        ]
      }
    };
  },
  mounted(){
    this.getCodeSelect()
  },
  methods: {
    ...mapActions(["handleLogin","handleGetCodeSelect"]),
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!ruler.mobile.test(this.ruleForm.MobileNumber)){
            this.$message.error('Something’s wrong with your number');
          }else if(this.ruleForm.Password < 6){
            this.$message.error('Password must be at least 6 digits')
          }else{
            this.handleSubmit()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSubmit(){
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneInfo'))
      let ruleParams=this.ruleForm
      let finalParams={ ...phoneParams, ...ruleParams}
      console.log("finalParams",finalParams)
      this.handleLogin(finalParams).then(
        res => {
          console.log("success",res)
          this.$router.push('/scanCode')
        },
        res => {
          console.log("err",res)
        }
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin() {
      this.$router.push('/login')
    },
    toRegister() {
      this.$router.push('/login')
    },
    toReset() {
      this.$router.push('/resetGetPhone')
    }
  }
}
</script>

<style lang="less">
.loginWrap{
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
    .loginForm{
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