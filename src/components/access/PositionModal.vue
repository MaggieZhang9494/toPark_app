<template>
  <div class="positionModalWrap">
    <Overlay class="overlay" :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <img src="../../assets/gate_modal.png" />
        <el-card class="box-card">
          <icon class="el-icon-location" />
          <div class="visite1">you are visiting</div>
          <div class="visite2">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
        </el-card>
        <el-button @click="checkAddress" type="primary" round style="width:60%;margin-bottom:15px;">Check-In<i class="el-icon-s-unfold el-icon--right"></i></el-button>
        <br />
        <el-button @click="toLogin" plain round style="border:1px solid #1890ff;width:60%;color:#1890ff">Check-Out<i class="el-icon-s-fold el-icon--right"></i></el-button>
      </div>
    </Overlay>
  </div>
</template>

<script>
import { Overlay } from 'vant';
export default {
  name: 'position-modal',
  components:  {
    Overlay
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    checkAddress() {
      this.show= false
    },
    toLogin(formName) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.positionModalWrap{
  display: flex;
  flex-direction: column;
}
</style>