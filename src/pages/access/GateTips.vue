<template>
  <div class="gateTipsWrap" ref="gateTipsWrap">
    <position-modal />
    <open-bg />
    <div class="vehicheWrap">
      <div class="timeWrap">
        <div><i class="el-icon-key" />Vehiche Access</div>
        <div><i class="el-icon-time" />{{gettime}}</div>
      </div>
      <div class="selectWrap">
        <div class="selectInput" @click="showCar = true">
          <span>{{carText}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <div class="selectInput" style="margin-top:15px" @click="checkCar = true">
          <span>{{carParams.number2}}</span>
          <i class="el-icon-circle-plus-outline" style="color:#50CEC3" />
        </div>
        <div class="sliderBtn">
          <div class="sliderBtn">
              <drag-verify 
					      @passcallback= "passcallback"
                :width="windowSize" 
                :height="46" 
                text="Swipe to open  >>"
                success-text="success" 
                background="#E9EDEF" 
                progress-bar-bg="#50CEC3" 
                completed-bg="#50CEC3" 
                handler-bg="#50CEC3"  
                :text-size="16"
                handler-icon="el-icon-lock"
                success-icon="el-icon-unlock"
			          isCircle='true'
                ref="Verify"
            >
            </drag-verify>
          </div>
        </div>
        <el-button type="primary" round style="width: -webkit-fill-available;margin:15px 20px;" icon="el-icon-loading"></el-button>
        <!-- <el-button type="primary" round style="width: -webkit-fill-available;margin:15px 20px;" icon="el-icon-unlock"></el-button> -->
      </div>
    </div>
    <!-- <div class="doorWrap">
      <div class="timeWrap">
        <div><i class="el-icon-key" />Door Access</div>
        <div><i class="el-icon-time" />{{gettime}}</div>
      </div>
      <div class="selectWrap">
        <div class="selectInput" @click="showDoor = true">{{doorText}}</div>
        <div class="sliderBtn">
          <drag-verify 
            @passcallback= "passcallback"
            :width="windowSize" 
            :height="46" 
            text="Swipe to open  >>"
            success-text="success" 
            background="#E9EDEF" 
            progress-bar-bg="#50CEC3" 
            completed-bg="#50CEC3" 
            handler-bg="#50CEC3"  
            :text-size="16"
            handler-icon="el-icon-lock"
            success-icon="el-icon-unlock"
            isCircle='true'
            ref="Verify"
          >
          </drag-verify>
        </div>
      </div>
      <el-button type="primary" round style="width: -webkit-fill-available;margin:15px 20px;" icon="el-icon-loading"></el-button>
      <el-button type="primary" round style="width: -webkit-fill-available;margin:15px 20px;" icon="el-icon-unlock"></el-button>
    </div> -->
    <Popup v-model="showDoor" position="bottom">
      <Picker
        show-toolbar
        :columns="columnsDoor"
        confirm-button-text="Ok"
        cancel-button-text="cancel"
        @confirm="onConfirmDoor"
        @cancel="showDoor = false"
      />
    </Popup>
    <Popup v-model="showCar" position="bottom">
      <Picker
        show-toolbar
        :columns="columnsCar"
        confirm-button-text="Ok"
        cancel-button-text="cancel"
        @confirm="onConfirmCar"
        @cancel="showCar = false"
      />
    </Popup>
    <Overlay class="overlay" :show="checkCar" @click="checkCar = false">
      <div class="wrapperOverlay" @click.stop>
        <div class="headerOverlay">
          <span class="headerTitle">Add Vehicle</span>
          <i class="el-icon-error" @click="checkCar = false"/>
        </div>
        <el-form class="addVehicle" :label-position="labelPosition" :model="addVehicle" :rules="rules" ref="addVehicle">
          <el-form-item label="number plate" prop="plateNum">
            <el-input v-model="addVehicle.plateNum" placeholder="Please enter the license plate number"></el-input>
          </el-form-item>
          <el-form-item label="Vehicle photos" prop="photos">
            <!-- <el-input v-model="addVehicle.photo"></el-input> -->
            <!-- <Uploader v-model="addVehicle.photo" /> -->
            <el-upload
              action="#"
              list-type="picture-card"
              :limit="1"
              :on-change="handleChange"
              :file-list="addVehicle.photo"
              :multiple="false"
              :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="overlayDisabled" style="width:100%" round type="primary" @click="submitForm('addVehicle')">submit Vehicle</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Overlay>
  </div>
</template>

<script>
import { Overlay, Popup, Picker, Uploader  } from 'vant';
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
    Picker,
    Uploader 
  },
  data() {
    return {
      show: true,
      gettime: '111',
      showDoor: false,
      showCar: false,
      doorParams:{
        number: 123456,
        pass:false
      },
      carParams:{
        number: 123456,
        number2:'111',
        pass:false
      },
      doorText: '',
      carText: '',
      columnsDoor:[{text:'111',code:1},{text:'222',code:2}],
      columnsCar:[{text:'333',code:1},{text:'444',code:2}],
      labelPosition:'top',
      checkCar: false,
      overlayDisabled: true,
      rules: {
        plateNum: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
      },
      addVehicle:{
        plateNum:'',
        photo:[]
      },
      isPassing2: false,
      dialogVisible: false,
      disabled: false,
      windowSize: 400,
    }
  },
  created() {
    // this.currentTime();
    this.windowSize =   `${document.documentElement.clientWidth}`- 40
    window.onresize = function temp() {
      this.windowSize = `${document.documentElement.clientWidth}`- 40
    }
  },
  methods: {
    // getWindowSize(){
    //   this.windowSize=   `${document.documentElement.clientWidth}` - 40
    //   console.log("width",width)
    // },
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
    onConfirmCar(values) {
      console.log("values",values)
      this.carParams.number = values.code;
      this.carText = values.text;
      this.showCar = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      this.addVehicle.photo=[]
      console.log(file);
    },
    handleChange(file,fileList){
        if (fileList.length>0) {
            this.addVehicle.photo=[fileList[fileList.length-1]]
        }
    },
    passcallback() {
			if(this.$refs.Verify.isPassing){
				this.show = false
			}
		}
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
      position: relative;
      &:hover{
        border: 1px solid #50CEC3;
      }
      i{
        position: absolute;
        right: 20px;
        top: 14px;
        font-size: 16px;
      }
    }
    .sliderBtn{
      margin: 15px 20px 15px 10px;
      border-radius: 22px;
      i{
        color: #fff !important;
      }
      .drag_verify{
        border-radius: 8px;
        .dv_text{
          color: #343434
        }
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