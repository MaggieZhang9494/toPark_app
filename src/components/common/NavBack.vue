<template>
  <div>
    <NavBar 
      title=""
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name:'nav-back',
  components: {
    NavBar
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