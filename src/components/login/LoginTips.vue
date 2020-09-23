<template>
  <div>
    <el-link 
      :underline="false" 
      icon="el-icon-arrow-left"
      @click="onClickLeft"
    >
    </el-link>
    <div v-show="tipsType">
      <div class="comLogTips1">Glad to!</div>
      <div class="comLogTips1">meet you</div>
      <div class="comLogTips2">Sign up and get started.</div>
    </div>
    <div v-show="!tipsType">
      <div class="comLogTips1">Welcome</div>
      <div class="comLogTips1">back.</div>
      <div class="comLogTips2">How have you been?</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'login-tips',
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  },
  props: {
    tipsType: {
        type: Boolean,
        default: () => {
            // return true
        }
    }

  }
}
</script>

<style lang="less">
.comLogTips1 {
  font-size: 48px;
  font-family: Montserrat;
  font-weight: 700;
  line-height: 58px;
  color: #202E37;
  padding-left: 25px;
}
.comLogTips2 {
  font-size: 22px;
  font-family: Montserrat;
  font-weight: 580;
  line-height: 27px;
  color: #202E37;
  padding: 10px 0 5px 25px;
}
</style>