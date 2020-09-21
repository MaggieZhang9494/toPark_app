<template>
  <div>
    <nav-back />
    <div class="tips">Glad to meet you!</div>
    <div>Sign up and get started.</div>
  </div>
</template>

<script>
import NavBack from '../common/NavBack'
export default {
  name:'login-tips',
  components: {
    NavBack
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">

</style>