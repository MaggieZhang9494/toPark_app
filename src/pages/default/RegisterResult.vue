<template>
  <div>
    <div>
      <el-link 
        :underline="false" 
        icon="el-icon-arrow-left"
        @click="onClickLeft"
      >
        <div>Countdown to {{time}} minutes</div>
      </el-link>
      <el-card class="box-card">
        <img src="../../assets/top_icon.png"/>
        <div>Complete</div>
        <div>registration</div>
        <div>Almost there… simply click on Quick Access to scan QR code for access (expire in 10mins) or download ToPark app for a truly contactless entry.</div>
        <div><el-link @click="download">Download "ToPark"</el-link></div>
        <el-button type="primary" @click="toLogin">Quick Access</el-button>
      </el-card>
      <el-link @click="download">www.topark.io</el-link>
    </div>
    <div>
      <el-link 
        :underline="false" 
        icon="el-icon-arrow-left"
        @click="onClickLeft"
      >
      </el-link>
      <el-card class="box-card">
        <img src="../../assets/top_icon.png"/>
        <div>Quick Access has timed out.</div>
        <div>Download ToPark App for a truly contactless entry.</div>
        <el-button type="primary" @click="download">Download App</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    name: 'RegisterResult',
    data () {
      return {
        time: 10
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
    }
  }
}
</script>