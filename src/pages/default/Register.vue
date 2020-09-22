<template>
  <div class="registerWrap">
    <login-tips />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:24px">Sign Up</span>
        <el-button style="float: right;font-size:14px;color:#cdcdcd;" type="text"
        @click="toLogin">Sign In</el-button>
      </div>
      <div class="text item">
        <el-form class="registerForm" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="" class="leftSelect">
            <el-select v-model="ruleForm.region" placeholder="">
              <el-option label="+86" value="shanghai"></el-option>
              <el-option label="+83" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Phone" prop="phone" class="rightInput">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-row style="align-items: center;display: flex;">
            <el-col :span="12">
              <el-form-item label="One Time Password" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item></el-col>
            <el-col :span="12">
              <div class="timeCall">after {{time}} seconds</div>
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
export default {
  name: 'Register',
  components: {
    LoginTips
  },
  data() {
    return {
      labelPosition: 'top',
      time: 59,
      ruleForm: {
        phone: '',
        password: '',
        region: 'shanghai'
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
        width: 72px;
        position: absolute;
        top: 29px;
        left: 1px;
        z-index: 999;
        background-color: #E9EDEF;
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
          padding-left: 80px;
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