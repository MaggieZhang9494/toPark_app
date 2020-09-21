<template>
  <div>
    <el-link 
      :underline="false" 
      icon="el-icon-arrow-left"
      @click="onClickLeft"
    >
    </el-link>
    <el-card class="box-card">
      <img src="../../assets/top_icon.png"/>
      <div>Scan QR code for access</div>
      <el-button type="primary" @click="submitForm('ruleForm')">Scan It</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ScanCode',
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>