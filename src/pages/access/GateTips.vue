<template>
  <div class="gateTipsWrap">
    <!-- <position-modal /> -->
  </div>
</template>

<script>
import { Overlay } from 'vant';
import PositionModal from '../../components/access/PositionModal'
export default {
  name: 'GateTips',
  components:  {
    Overlay,
    PositionModal
  },
  data() {
    return {
      show: true
    }
  }
}
</script>

<style lang="less">
.gateTipsWrap{
  display: flex;
  flex-direction: column;
}
</style>