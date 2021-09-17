<template>
  <div class="container-view welcome-view">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed="left" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleSeeClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
        </template></el-table-column
      >
      <el-table-column prop="userName" label="账号"> </el-table-column>
      <el-table-column prop="nickName" label="名称"> </el-table-column>
      <el-table-column prop="phonenumber" label="联系电话"> </el-table-column>
      <el-table-column prop="updateTime" label="修改时间"> </el-table-column>
      <el-table-column prop="updateBy" label="创建人"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      v-show="total > 0"
      :total="total"
      @current-change="changePage"
    >
    </el-pagination>
    <!-- 查看 -->
    <el-dialog title="提示" :visible.sync="seeVisible" width="30%">
      <see :rowDetail="rowDetail" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="seeVisible = false">取 消</el-button>
        <el-button type="primary" @click="seeVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import See from '~/components/index/see'
export default {
  components: {
    See,
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      page: 1,
      seeVisible: false,
      rowDetail: {},
    }
  },
  head() {
    return {
      title: '首页',
      meta: [
        {
          hid: 'home custom title',
          name: 'home',
          content: 'home custom title description',
        },
      ],
    }
  },
  async asyncData(context) {
    let data = {
      params: {
        pageNum: 1,
        pageSize: 10,
        page: 1,
      },
    }
    let { rows, total } = await context.$axios.get('/system/user/list', data)
    return {
      tableData: rows,
      total: total,
    }
  },
  mounted() {},
  methods: {
    handleSeeClick(row) {
      this.rowDetail = row
      this.seeVisible = true
    },
    changePage(val) {
      let data = {
        params: {
          pageNum: val,
          pageSize: 10,
          page: 1,
        },
      }
      this.$axios.get('/system/user/list', data).then((res) => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
  },
}
</script>

<style lang="less">
.container-view {
  margin-top: 1.767rem;
  display: flex;
  flex-direction: column;
  .welcome_feed {
    overflow: hidden;
    -webkit-box-flex: 1;
    flex-grow: 1;
  }
}
.category-nav {
  background-color: #fff;
  padding: 1.5rem 2rem;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid #f6f6f6;
  h5 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
  .more {
    display: none;
  }
  .nav-list {
    display: flex;
    -webkit-box-align: baseline;
    align-items: baseline;
    li.nav-item {
      &:hover {
        color: #007fff;
      }
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
    .nav-item {
      font-size: 14px;
      color: #90979c;
      padding: 0 !important;
      height: initial !important;
      line-height: initial !important;
      .nuxt-link-exact-active {
        color: #007fff;
      }
    }
  }
}

.to-top-btn {
  position: fixed;
  right: 2rem;
  bottom: 3rem;
  z-index: 1000;
  padding: 0;
  width: 3.33rem;
  height: 3.33rem;
  line-height: 1;
  color: #909090;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: none;
  transition: all 0.2s;
}
.to-top-btn.show {
  display: block;
}

@media (max-width: 600px) {
  .category-nav {
    .more {
      display: block;
    }
    .nav-list {
      display: none;
    }
  }
}
</style>
