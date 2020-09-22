<template>
  <div>
    <login-tips />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Sign Up</span>
        <el-button style="float: right; padding: 3px 0" type="text">Sign In</el-button>
      </div>
      <div class="text item">
        <el-form class="registerForm" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="" class="leftSelect">
            <el-select v-model="ruleForm.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Phone" prop="phone" class="rightInput">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="One Time Password" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Next step</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 密码不一致，密码少于6位，号码已注册
import LoginTips from '../../components/login/LoginTips'
export default {
  name: 'Register',
  components: {
    LoginTips
  },
  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        phone: '',
        password: '',
        region: []
      },
      rules: {
        phone: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '', trigger: 'blur' },
          { min: 6, max: 20, message: '', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.$router.push('/setPwd')
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
.registerForm{
  position: relative;

  .leftSelect{
    width: 80px;
    position: absolute;
    top: 28px;
    left: 0;
    z-index: 999;
    .el-input--suffix .el-input__inner{
      padding-right: 0;
    }
    .el-input__icon{
      display: none;
    }
  }

}
</style>