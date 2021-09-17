<template>
  <header class="v-header">
    <div class="header-container">
      <nuxt-link to="/">
        <img src="~/assets/img/NUXTJS-logo-800.png" alt="" class="logo-img" />
      </nuxt-link>
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="main-nav-list">
            <v-dropdown />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import VDropdown from './dropdown'

export default {
  name: 'VHeader',
  components: {
    VDropdown,
  },
  data() {
    return {
      maxClientWidth: 980,
    }
  },
  computed: {
    ...mapState({
      isPhone: (state) => state.isPhone,
    }),
  },
  mounted() {
    const self = this
    document.body.onresize = () => {
      if (document.body.clientWidth > self.maxClientWidth) {
        // self.$store.commit('PCORPHONE', false)
      } else {
        // self.$store.commit('PCORPHONE', true)
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/header';
.logo-img {
  width: 80px;
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
@media (max-width: 960px) {
  .v-header {
    .header-container {
      width: 96%;
    }
  }
}
</style>
