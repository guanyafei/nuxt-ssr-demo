<template>
  <div class="books-index-view">
    <div class="list-wrap">
      <div class="book-list">小册</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: '小册',
      meta: [
        {
          hid: 'books custom title',
          name: 'books',
          content: 'books custom title description',
        },
      ],
    }
  },
  async asyncData({ store, error }) {
    const param = {
      src: 'web',
      pageNum: 1,
    }
    const [res] = await Promise.all([
      store.dispatch('getListByLastTime', param),
    ])
    return {
      lists: res.d,
    }
  },
}
</script>

<style lang="less" scoped>
.books-index-view {
  margin: 1.767rem auto 0;
  width: 100%;
  position: relative;
}
.list-wrap {
  display: flex;
  position: relative;
  margin-bottom: 50px;
}
.book-list {
  flex: 1;
  box-shadow: 0 1px 3px 0 rgba(4, 5, 13, 0.23);
}
@media (max-width: 960px) {
  .book-list {
    margin: 0 auto 50px;
  }
}
</style>
