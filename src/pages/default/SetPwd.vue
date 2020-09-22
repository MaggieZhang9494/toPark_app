<template>
  <div class="setPwdWrap">
    <login-tips />
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
            <el-button style="width:100%" type="primary" @click="submitForm('ruleForm')">Sing Up</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 密码不一致，密码少于6位，号码已注册
import LoginTips from '../../components/login/LoginTips'
export default {
  name: 'SetPwd',
  components: {
    LoginTips
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(''));
      } else if (value.length < 6) {
        callback(new Error(''));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value.length < 6) {
        callback(new Error(''));
      }  else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
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
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.$router.push('/updateInfo')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
