<template id="app">
  <body>
    
    <div class="app_container">
      <div class="header_container" :class="{ light_mode: isActive}">
        <NavigationMobile/>
      </div>
      <aside class="slider_container" :class="{ light_mode: isActive}" id="left">
        <NavigationDesktop/>
      </aside>
      <div class="content_container" :class="{ light_mode: isActive}" id="right">
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

export default {
  name: "App",
  components: {
    NavigationMobile,
    NavigationDesktop
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
