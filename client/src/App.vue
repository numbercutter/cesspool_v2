<template id="app">
  <body>
    
    <div class="app_container" :class="{ light_mode: isActive}">
      <div class="header_container">
        <NavigationMobile/>
      </div>
      <aside class="slider_container" id="left">
        <NavigationDesktop/>
      </aside>
      <div class="login_container">
        <Login/>
      </div>
      <div class="content_container" id="right">
        <div id="light_mode_button">
          <img src="./assets/img/dl.webp" @click="lightMode" class="theme_img">
        </div>
        <router-view />
      </div>
    </div>
  </body>
</template>
<script>
import NavigationMobile from './components/NavigationMobile.vue';
import NavigationDesktop from './components/NavigationDesktop.vue';
import { ref } from 'vue';
import Login from '@/components/Login.vue';

export default {
  name: "App",
  components: {
    NavigationMobile,
    NavigationDesktop,
    Login,

  },
  setup() {

    const isActive = ref(false)
    const lightMode = async () => {
      isActive.value = !isActive.value;
      return
    }

    return {
      isActive,
      lightMode
    }
  }
}
</script>
<style lang="scss">
@import "./styles/main.scss";


@import '~primevue/resources/themes/luna-amber/theme.css';
@import '~primevue/resources/primevue.min.css';
</style>
