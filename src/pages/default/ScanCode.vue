<template>
  <div class="scanCodeWrap">
    <el-link 
      :underline="false" 
      icon="el-icon-arrow-left"
      @click="onClickLeft"
    >
    </el-link>
    <el-card class="box-card">
      <!-- <img src="../../assets/top_icon.png"/> -->
      <Icon style="padding-top: 15px;padding-bottom: 20px;" name="scan" size="77" color="#50CEC3"/>
      <div class="scanTips">Scan QR code for access</div>
       <!-- @click="toAccess" -->
      <el-button round type="primary" @click="show = true">Scan It</el-button>
      <!-- <input  type="file" accept="image/*" capture="camera"> -->
    </el-card>
    <div v-show="show" class="scanWrap">
      <i class="el-icon-error" @click="show = false"/>
      <qrcode-stream v-show="show" @decode="onDecode"  style="width:100%;height:100%"></qrcode-stream>
    </div>
  </div>
</template>

<script>
import { Icon, Overlay  } from 'vant'
import { mapActions } from 'vuex'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
export default {
  name: 'ScanCode',
  components:{
    Icon,
    Overlay,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  data(){
    return{
      show: false
    }
  },
  mounted(){
  },
  methods: {
    ...mapActions(["handleLogin"]),
    onDecode (decodedString) {
      console.log("decodedString",decodedString)
      if(decodedString){
        // window.location.href="https://www.baidu.com"
        window.location.href= `topark://GotoGuest?DeviceKey=${decodedString}`
      }else{
        this.show= false
        this.$message.error('Access denied. Please contact host.')
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    toAccess() {
      this.$router.push('/gateTips')
    },
    getDetail(){
      this.handleLogin().then(
        res => {
          console.log("success",res)
        },
        res => {
          console.log("err",res)
        }
      );
    }
  }
}
</script>

<style lang="less">
.scanCodeWrap{
  display: flex;
  flex-direction: column;
  .el-link{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 60px;
  }
  .el-card{
    margin: 15px 18px;
    text-align: center;
    .el-card__header{
      padding-bottom: 0;
    }
    .el-card__body{
      padding: 15px 42px;
      
      img{
        width: 77px;
        padding-top: 15px;
        padding-bottom: 20px;
      }

      .scanTips{
        font-size: 14px;
        font-family: Montserrat;
        font-weight: 600;
        line-height: 18px;
        color: #343434;
        padding-bottom: 20px;
      }
      .el-button{
        width: 100%;
        margin-bottom: 20px;
        padding: 16px 25px;
        font-size: 16px;
      }
    }
  }
  .scanWrap{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    z-index: 998;
    .el-icon-error{
      position:fixed;
      left:20px;
      top:30px;
      font-size: 25px;
      color: #efefef;
      z-index: 999;
    }
  }
}
</style>