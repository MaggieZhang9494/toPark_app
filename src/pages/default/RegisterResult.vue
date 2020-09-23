<template>
  <div class="registerResultWrap">
    <div class="successWrap" v-show="isSuccess">
      <el-link 
        :underline="false" 
        icon="el-icon-arrow-left"
        @click="onClickLeft"
        class="navLink"
      >
        <div style="color: #707070">
          Countdown to 
          <CountDown
            ref="countDown"
            :time="time"
            :auto-start="true"
            format="ss"
            @finish="finish"
          />
           minutes
          </div>
      </el-link>
      <el-card class="box-card">
        <img src="../../assets/top_icon.png"/>
        <div class="firstTips">Complete</div>
        <div class="firstTips">registration</div>
        <div class="secondTips">Almost there… simply click on Quick Access to scan QR code for access (expire in 10mins) or download ToPark app for a truly contactless entry.</div>
        <div><el-link class="thirdTips" @click="download">Download "ToPark"</el-link></div>
        <el-button round type="primary" @click="toLogin">Quick Access</el-button>
      </el-card>
      <el-link class="downLink" @click="download">www.topark.io</el-link>
    </div>
    <div class="errorWrap" v-show="!isSuccess">
      <el-link 
        :underline="false" 
        icon="el-icon-arrow-left"
        @click="onClickLeft"
        class="navLink"
      >
      </el-link>
      <el-card class="box-card">
        <img src="../../assets/top_icon.png"/>
        <div class="firstTips">Quick Access has timed out.</div>
        <div class="secondTips">Download ToPark App for a truly contactless entry.</div>
        <el-button round type="primary" @click="download">Download App</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import { CountDown } from 'vant'
export default {
  name: 'RegisterResult',
  components:{
    CountDown
  },
  data () {
    return {
      isSuccess: true,
      time: 10000
    }
  },
  mounted(){
    if(this.isSuccess){
      this.start()
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    toLogin() {
      this.$router.push('/login')
    },
    download() {
      alert(1)
    },
    start() {
      this.$refs.countDown.start();
    },
    pause() {
      this.$refs.countDown.pause();
    },
    reset() {
      this.$refs.countDown.reset();
    },
    finish() {
      this.$router.push('/login')
    },
  }
}
</script>

<style lang="less">
.registerResultWrap{
  display: flex;
  flex-direction: column;
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
  .navLink{
    padding-bottom: 15px;
    padding-top: 15px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
    font-size: 14px;
    .el-icon-arrow-left{
      font-size: 16px;
    }
    .van-count-down{
      display: inline;
      color: #50CEC3;
      font-weight: 600;
    }
  }
  .el-card{
    margin: 15px 18px;
    text-align: center;
    .el-card__header{
      padding-bottom: 0;
    }
    .el-card__body{
      padding: 15px 20px;
      
      img{
        width: 70px;
        padding-top: 50px;
        padding-bottom: 20px;
      }

      .firstTips{
        font-size: 18px;
        font-family: Montserrat;
        font-weight: 600;
        line-height: 22px;
        color: #202E37;
        padding-bottom: 5px;
      }

      .secondTips{
        font-size: 14px;
        font-family: SFUIDisplay-Regular;
        font-weight: 400;
        line-height: 16px;
        color: #9B9B9B;
        padding-top: 15px;
        padding-bottom: 35px;
      }

      .thirdTips{
        height: 16px;
        font-size: 14px;
        font-family: SFUIDisplay-Regular;
        font-weight: 400;
        line-height: 16px;
        color: #50CEC3 !important;
        text-decoration: underline !important;
      }
    }
  }
  .el-button--primary{
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }
  .downLink{
    color: #50CEC3 !important;
    font-size: 14px;
    display: flex;
    height: 60px;
    margin-top: -20px;
  }
}
</style>