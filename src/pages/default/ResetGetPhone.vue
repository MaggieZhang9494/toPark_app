<template>
  <div class="resetGetWrap">
    <login-tips :isForget="true"/>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:24px">Reset Password</span>
      </div>
      <div class="text item">
        <el-form class="resetGetPhone" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="" class="leftSelect">
            <el-select v-model="ruleForm.CountryCode" placeholder="">
              <el-option v-for="(item, index) in codeSelect" :label="'+'+item" :value="item" :key="index+'selectReset'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Phone" prop="MobileNumber" class="rightInput">
            <el-input v-model="ruleForm.MobileNumber"></el-input>
          </el-form-item>
          <div class="tips">Please enter your registered phone number ,we will send you a verification code in no time</div>
          <el-form-item>
            <el-button :disabled="btnDisabled" style="width:100%" round type="primary" @click="submitForm('ruleForm')">Next step</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 密码不一致，密码少于6位，号码已注册
import LoginTips from '../../components/login/LoginTips'
import { mapActions } from "vuex"
import ruler from '@/utils/ruler.js'
export default {
  name: 'ResetGetPhone',
  components: {
    LoginTips
  },
  data() {
    return {
      labelPosition: 'top',
      time: 59,
      ruleForm: {
        MobileNumber: '',
        CountryCode: ''
      },
      codeSelect: [],
      rules: {
        MobileNumber: [
          { required: true, message: '', trigger: 'blur' },
        ]
      },
      btnDisabled: true
    };
  },
  computed: {
    newMobileNumber() {
      return this.ruleForm.MobileNumber;
    }
  },
  watch: {
    newMobileNumber(val) {
      if(val.length == 11){
        this.btnDisabled= false
      }else{
        this.btnDisabled= true
      }
    }
  },
  mounted(){
    this.btnDisabled= true
    this.getCodeSelect()
  },
  methods: {
    ...mapActions(["handleGetCodeSelect"]),
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
          console.log('error submit!!');
        }
      });
    },
    handleSubmit() {
      if(!this.ruleForm.CountryCode){
        this.$message.error('Something’s wrong with countryCode');
        return false
      }else{
        sessionStorage.setItem('ResetInfo',JSON.stringify(this.ruleForm))
        this.$router.push('/resetPwd')
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less">
.resetGetWrap{
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
    .resetGetPhone{
      position: relative;
      .tips{
        font-size: 12px;
        font-family: SFUIDisplay-Regular;
        line-height: 14px;
        color: #9B9B9B;
        margin-bottom: 20px;
      }
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
          border-right: 1px solid rgba(138,143,152,0.17);;
          border-radius: 0;
        }
      }

      .rightInput{
        .el-input__inner{
          padding-left: 85px;
        }
      }
    }

  }
}
</style>