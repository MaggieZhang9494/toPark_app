<template>
  <div id="indexWrap" class="commonBgColor">
      <el-card class="box-card-pd">
          <!-- <img src='../../assets/top_icon.png'/> -->
          <div class="tipsWrap">
              <div class="tips1">ToPark</div>
              <div class="tips2">Control in your hands</div>
          </div>
          <el-divider></el-divider>
          <div class="tipsContent">
              <el-row>
                  <el-col :span="3">
                      <Icon color="#50CEC3" name="orders-o" />
                  </el-col>
                  <el-col :span="21">
                      <div>What’s this about?</div>
                      <div>
                          You have been granted a temporary access to a ToPark
                          community.
                      </div>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="3">
                      <Icon color="#50CEC3" name="gem-o" />
                  </el-col>
                  <el-col :span="21">
                      <div>Using ToPark is easy and free!</div>
                      <div>
                          1. Complete registration 2. Click the “Quick Access”
                          or download ToPark app.
                      </div>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="3">
                      <Icon color="#50CEC3" name="good-job-o" />
                  </el-col>
                  <el-col :span="21">
                      <div>
                          That’s it! ToPark makes access a breeze with your
                          smartphone.
                      </div>
                  </el-col>
              </el-row>
              <el-button type="primary" round @click="toRegister"
                  >Self Registration</el-button
              >
          </div>
      </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Icon } from "vant";
import errorTips from "@/utils/registerErr.js";

export default {
  components: {
    Icon
  },
  data() {
    return {};
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
    toWeb() {
      window.open("http://27.17.34.226:28064/home");
      // window.open('https://kxr.ovc.org.cn')
    },
    toForget() {
      this.$router.push("/forgetPassword");
    },
    changePwd: function() {
      this.passShowEye = !this.passShowEye;
    },
    onSubmit() {
      this.onVerifyLast().then(
        () => {
          let params = { ...this.params };
          this.onRequest(params);
        },
        err => {}
      );
    },
    onRequest(params) {
      this.loading = true;
      this.handleLogin(params).then(
        res => {
          if (res.code !== -1) {
            let tokenStr = res.token_type + " " + res.access_token;
            localStorage.setItem("DONGHU_TOKEN", tokenStr);
            sessionStorage.setItem("DONGHU_TOKEN", tokenStr);
            sessionStorage.setItem(
              "REFRESH_TOKEN",
              res.refresh_token
            );
            this.$router.push("/confirm");
          } else {
          }
          this.loading = false;
        },
        res => {
          this.loading = false;
        }
      );
    },
    onVerifyLast() {
      let flag = true;
      let errorMsg = "请填写完整信息";
      let requireArr = [
        { key: "username", msg: "请填写用户名" },
        { key: "password", msg: "请填写密码" }
      ];
      return new Promise((resolve, reject) => {
        requireArr.map(item => {
          if (!this.params[item.key]) {
            flag = false;
            errorMsg = item.msg;
          }
        });
        if (flag) {
          resolve();
        } else {
          reject(errorMsg);
        }
      });
    }
  }
};
</script>

<style lang="less">
#indexWrap {
  display: flex;
  flex-direction: column;

  .box-card-pd {
    img {
      width: 76px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .tipsWrap {
      .tips1 {
        font-size: 24px;
        font-family: Montserrat;
        font-weight: 400;
        line-height: 29px;
        color: #343434;
        padding-bottom: 5px;
      }
      .tips2 {
        font-size: 18px;
        font-family: SFUIDisplay-Regular;
        font-weight: 400;
        line-height: 21px;
        color: #9b9b9b;
      }
    }
    .tipsContent {
      text-align: left;
      .el-row {
        padding-bottom: 10px;
        .el-col-21 {
          div {
            &:first-child {
              line-height: 1;
            }
          }
        }
      }

      .el-button {
        margin: 0 auto;
        display: block;
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
