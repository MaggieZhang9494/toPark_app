<template>
  <div>
    <el-link 
      :underline="false" 
      icon="el-icon-arrow-left"
      @click="onClickLeft"
    >
    </el-link>
    <div class="tips">Glad to meet you!</div>
    <div>Sign up and get started.</div>
  </div>
</template>

<script>
export default {
  name:'login-tips',
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">

</style>