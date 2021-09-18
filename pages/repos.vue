<template>
  <div class="repos-page">实事页面</div>
</template>

<script>
export default {
  head() {
    return {
      title: '实事页面',
      meta: [
        {
          hid: 'repos custom title',
          name: 'repos',
          content: 'repos custom title description',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.repos-page {
  font-size: 20px;
  margin-top: 1.767rem;
  text-align: center;
}
</style>
