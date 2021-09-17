<template>
  <el-form label-width="80px" :model="rowDetail">
    <el-form-item label="账号">
      <el-input v-model="rowDetail.userName" readonly></el-input>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="rowDetail.nickName" readonly></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="rowDetail.phonenumber" readonly></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'See',
  components: {},
  props: {
    rowDetail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
}
</script>

<style lang="less" scoped>
</style>
