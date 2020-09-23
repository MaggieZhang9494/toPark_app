<template>
  <div class="positionModalWrap">
    <Overlay class="overlay" :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <img src="../../assets/gate_modal.png" />
        <el-card class="box-card">
          <icon class="el-icon-location-outline" />
          <div>you are visiting</div>
          <div>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
        </el-card>
        <el-button type="primary" style="width:100%">Check-In<i class="el-icon-s-unfold el-icon--right"></i></el-button>
        <br />
        <el-button plain type="primary" style="width:100%">Check-Out<i class="el-icon-s-fold el-icon--right"></i></el-button>
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
      show: true
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