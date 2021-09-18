<template>
  <header class="v-header">
    <div class="header-container">
      <nuxt-link to="/">
        <img src="~/assets/img/NUXTJS-logo-800.png" alt="" class="logo-img" />
      </nuxt-link>
      <nav class="main-nav">
        <ul class="nav-list">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="nav-item link-item"
          >
            <nuxt-link :to="{ name: item.name }">{{ item.title }}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'VHeader',
  components: {},
  data() {
    return {
      maxClientWidth: 980,
      items: [
        { name: 'index', title: '首页' },
        { name: 'repos', title: '实事页面' },
        { name: 'events-all', title: '活动' },
      ],
    }
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
@import '../../assets/css/header';
.logo-img {
  width: 80px;
}
.nuxt-link-exact-active {
  color: #007fff;
}
.v-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 5rem;
  background: #fff;
  color: #909090;
  border-bottom: 1px solid #f1f1f1;
  .header-container {
    max-width: 960px;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    position: relative;
  }
  .main-nav {
    height: 100%;
    flex: 1 0 auto;
  }
}
</style>
