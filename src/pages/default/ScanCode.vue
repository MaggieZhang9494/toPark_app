<template>
  <div class="scanCodeWrap">
    <el-link 
      :underline="false" 
      icon="el-icon-arrow-left"
      @click="onClickLeft"
    >
    </el-link>
    <el-card class="box-card">
      <img src="../../assets/top_icon.png"/>
      <div class="scanTips">Scan QR code for access</div>
      <el-button round type="primary" @click="toAccess">Scan It</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ScanCode',
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    toAccess() {
      this.$router.push('/gateTips')
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
}
</style>