<template>
  <div class="updateInfoWrap">
    <NavBar
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="tips">
      Please improve the person's information so that we can better help you
    </div>
    <Form>
      <Field name="uploader" label="Avatar Setting" input-align="right"
      right-icon="arrow">
        <template #input>
          <Uploader v-model="params.Avatar" max-count="1" :after-read="afterRead" />
        </template>
      </Field>
      <Field
        readonly
        clickable 
        input-align="right"
        name="Salutation"
        right-icon="arrow"
        :value="params.Salutation"
        label="Salutation"
        placeholder="please enter Salutation"
        @click="showSalutation = true"
      />
      <Field
        v-model="params.FirstName"
        name="FirstName"
        input-align="right"
        label="First Name"
        placeholder="please enter First Name"
      />
      <Field
        v-model="params.LastName"
        name="LastName"
        label="Last Name"
        input-align="right"
        placeholder="please enter Last Name"
      />
      <Field
        readonly
        clickable
        name="Birth"
        :value="params.Birthday"
        right-icon="arrow"
        label="Date Of Birth"
        input-align="right"
        placeholder="please select Date"
        @click="showCalendar = true"
      />
      <Field
        readonly
        clickable
        name="Gender"
        :value="params.Gender"
        label="Gender"
        right-icon="arrow"
        input-align="right"
        placeholder="please enter Gender"
        @click="showGender = true"
      />
      <Field
        v-model="params.Email"
        name="Email"
        label="Email"
        input-align="right"
        placeholder="please enter Email"
      />
    </Form>
    <Button style="margin: 22px;width: auto;font-size:16px" color="#50CEC3" type="primary" round block @click="toUpdate">Update</Button>
    <Popup v-model="showSalutation" position="bottom">
      <Picker
        show-toolbar
        :columns="columnsSalutation"
        confirm-button-text="Ok"
        cancel-button-text="cancel"
        @confirm="onConfirmSalutation"
        @cancel="showSalutation = false"
      />
    </Popup>
    <Popup v-model="showGender" position="bottom">
      <Picker
        show-toolbar
        :columns="columnsGender"
        confirm-button-text="Ok"
        cancel-button-text="cancel"
        @confirm="onConfirmGender"
        @cancel="showGender = false"
      />
    </Popup>
    <Calendar 
      v-model="showCalendar" 
      confirm-text="Ok"
      confirm-disabled-text=""
      :show-title='false'
      color="#50CEC3"
      @confirm="onConfirmCalendar" />
  </div>
</template>

<script>
import { NavBar, Uploader, Popup, Picker, Button, Icon, Form, Field, Calendar  } from 'vant'
import ruler from '@/utils/ruler.js'
import { mapActions } from 'vuex'
export default {
  name: 'UpdateInfo',
  components: {
    NavBar,
    Uploader,
    Popup,
    Picker,
    Button,
    Icon,
    Form,
    Field,
    Calendar
  },
  data() {
    return {
      params: {
        Salutation: '',
        FirstName: '',
        LastName: '',
        Avatar: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
        Birthday: '',
        Email: '',
        Gender: ''
      },
      showSalutation: false,
      showGender: false,
      columnsSalutation: ['Mr','Ms','Dr', 'Mdm'],
      columnsGender: ['male','female','unknown'],
      showCalendar: false,
    }
  },
  mounted() {
    this.getDefaultInfo()
  },
  methods: {
    ...mapActions(["handleUploadAvatar","handleGetProfile","handleUploadAvatar"]),
    onConfirmSalutation(values) {
      this.params.Salutation = values;
      this.showSalutation = false;
    },
    onConfirmCalendar(date) {
      this.params.Birthday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      this.showCalendar = false;
    },
    onConfirmGender(values) {
      this.params.Gender = values;
      this.showGender = false;
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    getDefaultInfo(){
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneInfo'))
      let finalParams={ ...phoneParams}
      console.log("finalParams",finalParams)
      // this.handleGetProfile(finalParams).then(
      //   res => {
      //     console.log("success",res)
      //   },
      //   res => {
      //     console.log("err",res)
      //   }
      // );
    },
    afterRead(file){
      let fileParams = {
          file: file.file,
      }
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneInfo'))
      let finalParams={ ...phoneParams,...fileParams}
      // this.handleUploadAvatar(finalParams).then(res=>{
        // this.params['financeReportSheet'] = JSON.stringify({
        //     id: result.fileId,
        //     contentType: result.contentType,
        //     relativeUrl: result.relativeFileUrl,
        //     fullUrl: result.absoluteFileUrl,
        // })                  
      // })
  },      
    toUpdate() {
      // if(ruler.mobile.test(this.ruleForm.MobileNumber)){
      //   this.resetTime= false
      //   this.sendSms()
      // }else{
      //   this.resetTime= true
      // }
      this.handleSubmit()
    },
    handleSubmit(){
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneInfo'))
      let finalParams={ ...phoneParams, ...this.params}
      console.log("finalParams",finalParams)
      return false
      this.handleUploadAvatar(finalParams).then(
        res => {
          console.log("success",res)
          // this.$router.push('/registerResult')
        },
        res => {
          console.log("err",res)
        }
      );
    },
  }
}
</script>

<style lang="less">
.updateInfoWrap{
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .van-hairline--bottom::after{
    border-bottom-width: 0;
  }
  .van-nav-bar{
    color: #747577;
    padding-top: 5px;
    padding-left: 5px;
    font-size: 16px;
    .van-icon{
      color: #747577;
    }
  }
  .tips{
    height: 32px;
    font-size: 14px;
    font-family: SFUIDisplay-Regular;
    font-weight: 400;
    line-height: 16px;
    color: #707070;
    padding: 15px 22px 8px;
    opacity: 0.62;
  }
  .van-cell{
    padding: 12px 22px;
    align-items:center;
    .van-field__label{
      width: 8em;
      font-size: 16px;
      font-family: Montserrat;
      font-weight: 600;
      line-height: 22px;
      color: #343434;
    }
    .van-field__control{
      font-size: 14px;
      font-family: SFUIDisplay-Regular;
      font-weight: 400;
      line-height: 16px;
      color: #CDCDCD;
    }
  }
}
</style>