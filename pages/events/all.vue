<template>
  <div class="events-page">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="账号"> </el-table-column>
      <el-table-column prop="nickName" label="名称"> </el-table-column>
      <el-table-column prop="phonenumber" label="联系电话"> </el-table-column>
      <el-table-column prop="updateTime" label="修改时间"> </el-table-column>
      <el-table-column prop="updateBy" label="创建人"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '活动页面',
      meta: [
        {
          hid: 'events custom title',
          name: 'events',
          content: 'events custom title description',
        },
      ],
    }
  },
  async asyncData(ctx) {
    let data = {
      params: {
        pageNum: 1,
        pageSize: 10,
        page: 1,
      },
    }
    let { rows, total } = await ctx.$axios.get('/system/user/list', data)
    return {
      tableData: rows,
      total: total,
    }
  },
}
</script>

<style lang="less" scoped>
.events-page {
  font-size: 20px;
  margin-top: 1.767rem;
  text-align: center;
}
</style>
