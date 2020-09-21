<template>
  <div>
    <NavBar
      left-arrow
      @click-left="onClickLeft"
    />
    <div>
      Please improve the person's information so that we can better help you
    </div>
    <CellGroup>
      <Cell title="Avatar Setting">
        <template #right-icon>
          <img src="../../assets/top_icon.png"/>
          <Icon name="search" class="search=icon" />
        </template>
      </Cell>
      <!-- <Cell title="" value="内容" is-link/> -->
      <Cell title="Salutation" value="内容" />
      <Cell title="First Name" value="内容" />
      <Cell title="Last Name" value="内容" />
      <Cell title="Date Of Birth" value="内容" is-link/>
      <Cell title="Gender" value="内容" is-link/>
      <Cell title="Email" value="内容" />
    </CellGroup>
    <Button color="#7232dd" type="primary" round block @click="toUpdate">Update</Button>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Button, Icon } from 'vant'
export default {
  name: 'UpdateInfo',
  components: {
    NavBar,
    Cell,
    CellGroup,
    Button,
    Icon
  },
  data() {
    return {
      params: {
        phone: '',
        password: ''
      },
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    toUpdate() {
      this.$router.push('/registerResult')
    }
  }
}
</script>