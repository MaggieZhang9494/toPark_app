<template>
    <div>download</div>
</template>

<script>
export default {
  name: 'Download',
  mounted(){
    this.toDownload()
  },
  methods: {
    toDownload() {
      let phoneParams= JSON.parse(sessionStorage.getItem('phoneParams'))
    }
  }
}
</script>