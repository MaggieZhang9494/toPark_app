<template>
  <div class="gateTipsWrap">
    <position-modal />
    <open-bg />
    <!-- <div class="vehicheWrap">
      <div class="timeWrap">
        <div><icon class="el-icon-key" />Vehiche Access</div>
        <div><icon class="el-icon-time" />{{gettime}}</div>
      </div>
      <div class="selectWrap">
        <div class="selectInput">{{doorParams.number}}</div>
        <div class="sliderBtn">

        </div>
      </div>
    </div> -->
    <div class="doorWrap">
      <div class="timeWrap">
        <div><icon class="el-icon-key" />Door Access</div>
        <div><icon class="el-icon-time" />{{gettime}}</div>
      </div>
      <div class="selectWrap">
        <div class="selectInput" @click="showDoor = true">{{doorText}}</div>
        <div class="sliderBtn">
          <dragVerify 
            ref="dragVerify"
            :isPassing.sync="isPassing2"
            text="Swipe to open  >>"
            handlerIcon="el-icon-lock"
            successIcon="el-icon-unlock"/>
            <!-- <el-button type="primary" round style="width:100%;margin-top:15px;" icon="el-icon-loading"></el-button> -->
            <el-button type="primary" round style="width:100%;margin-top:15px;" icon="el-icon-unlock"></el-button>
        </div>
      </div>
    </div>
    <Popup v-model="showDoor" position="bottom">
      <Picker
        show-toolbar
        :columns="columnsDoor"
        @confirm="onConfirmDoor"
        @cancel="showDoor = false"
      />
    </Popup>
  </div>
</template>

<script>
import { Overlay, Popup, Picker } from 'vant';
import PositionModal from '../../components/access/PositionModal'
import OpenBg from '../../components/access/OpenBg'
import dragVerify from 'vue-drag-verify2'
export default {
  name: 'GateTips',
  components:  {
    Overlay,
    PositionModal,
    OpenBg,
    dragVerify,
    Popup,
    Picker
  },
  data() {
    return {
      show: true,
      showDoor: false,
      showCar: false,
      gettime: '111',
      doorParams:{
        number: 123456,
      },
      carParams:{
        number: 123456,
      },
      columnsDoor:[{text:'111',code:1},{text:'222',code:2}],
      doorText: ''
    }
  },
  created() {
    // this.currentTime();    
  },
  methods: {
    getTime() {
      var _this = this;
      let curretTime= new Date()
      let hh = curretTime.getHours();
      let mf = curretTime.getMinutes()<10 ? '0'+curretTime.getMinutes() : curretTime.getMinutes();
      let ss = curretTime.getSeconds()<10 ? '0'+curretTime.getSeconds() :curretTime.getSeconds();
      _this.gettime = hh+':'+mf+':'+ss;
    },
    currentTime(){
      setInterval(this.getTime,500)
    },
    onConfirmDoor(values) {
      console.log("values",values)
      this.doorParams.number = values.code;
      this.doorText = values.text;
      this.showDoor = false;
    },
  }
}
</script>

<style lang="less">
.gateTipsWrap{
  display: flex;
  flex-direction: column;
  .timeWrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    color: #cdcdcd;
    font-size: 14px;
    font-weight: 500;
    icon{
      padding-right: 5px;
    }
  }
  .selectWrap{
    .selectInput{
      height: 20px;
      line-height: 20px;
      padding: 12px 10px;
      margin: 0 20px;
      border: 1px solid #D8DFE3;
      border-radius: 8px;
      color: #343434;
      font-size: 14px;
      font-weight: 550;
      &:hover{
        border: 1px solid #50CEC3;
      }
    }
    .sliderBtn{
      margin: 15px 20px;
      border-radius: 22px;
      .drag_verify{
        border-radius: 8px;
        background-color: #fff;
      }
      .dv_progress_bar{
        background: #50CEC3 !important;
      }
      .dv_handler{
        background-color: #50CEC3;
        border-radius: 5px;
        width: 70px;
      }
    }
  }
  .vehicheWrap, .doorWrap{
    background-color: #fff;
    padding-bottom: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: fixed;
    width: inherit;
    bottom: 0;
  }
}
</style>