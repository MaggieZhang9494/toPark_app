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
          <Uploader v-model="params.avatar" max-count="1"/>
        </template>
      </Field>
      <Field
        readonly
        clickable 
        input-align="right"
        name="Salutation"
        right-icon="arrow"
        :value="salutationText"
        label="Salutation"
        placeholder="please enter Salutation"
        @click="showSalutation = true"
      />
      <Field
        v-model="params.firstName"
        name="FirstName"
        input-align="right"
        label="First Name"
        placeholder="please enter First Name"
      />
      <Field
        v-model="params.lastName"
        name="LastName"
        label="Last Name"
        input-align="right"
        placeholder="please enter Last Name"
      />
      <Field
        readonly
        clickable
        name="Birth"
        :value="params.birth"
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
        :value="genderText"
        label="Gender"
        right-icon="arrow"
        input-align="right"
        placeholder="please enter Gender"
        @click="showGender = true"
      />
      <Field
        v-model="params.email"
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
        @confirm="onConfirmSalutation"
        @cancel="showSalutation = false"
      />
    </Popup>
    <Popup v-model="showGender" position="bottom">
      <Picker
        show-toolbar
        :columns="columnsGender"
        @confirm="onConfirmGender"
        @cancel="showGender = false"
      />
    </Popup>
    <Calendar v-model="showCalendar" @confirm="onConfirmCalendar" />
  </div>
</template>

<script>
import { NavBar, Uploader, Popup, Picker, Button, Icon, Form, Field, Calendar  } from 'vant'
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
        salutation: '',
        firstName: '',
        lastName: '',
        avatar: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
        birth: '',
        email: '',
        gender: ''
      },
      salutationText: '',
      genderText: '',
      showSalutation: false,
      showGender: false,
      columnsSalutation: [{text:'Mr',code:1},{text:'Miss',code:2}],
      columnsGender: [{text:'male',code:1},{text:'female',code:2}],
      showCalendar: false,
    }
  },
  methods: {
    onConfirmSalutation(values) {
      console.log("values",values)
      this.params.salutation = values.code;
      this.salutationText = values.text;
      this.showSalutation = false;
    },
    onConfirmCalendar(date) {
      this.value = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    onConfirmGender(values) {
      this.params.gender = values.code;
      this.genderText = values.text;
      this.showGender = false;
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    toUpdate() {
      this.$router.push('/registerResult')
    }
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