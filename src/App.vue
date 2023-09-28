<template id="app">
  <body>
    <div class="app_container" :class="{ light_mode: isActive}">
      <!-- Modals -->
      <CustomModal :show="modal.loadingModal" @close="modal.loadingModal = false">
        <div class="modal__content">
          <div>Loading...</div>
        </div>
      </CustomModal>
      <CustomModal :show="modal.txnModal.status" @close="modal.txnModal.status = false">
        <div class="modal__content">
          <p>{{ modal.txnModal.hash }}</p>
          <p>Transaction hash</p>
        </div>
      </CustomModal>
      <!-- End of Modals -->
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
import { ref } from 'vue'; // Import reactive
import { computed } from 'vue';
import { useStore } from 'vuex';

import Login from '@/components/Login.vue';
import CustomModal from '@/components/CustomModal.vue';

export default {
  name: "App",
  components: {
    NavigationMobile,
    NavigationDesktop,
    Login,
    CustomModal, // Add VueFinalModal to components
  },
  setup() {
    const store = useStore();
    const isActive = ref(false);
    
    const modal = computed(() => store.state.modal); // Access modal state from the store

    const lightMode = async () => {
      isActive.value = !isActive.value;
      document.body.classList.toggle("light_mode", isActive.value);
    };

    return {
      isActive,
      lightMode,
      modal // Return modal object
    }
  }
}
</script>
<style lang="scss">
@import "./styles/main.scss";
@import '~primevue/resources/themes/luna-amber/theme.css';
@import '~primevue/resources/primevue.min.css';
/* You can add custom modal styles here */
</style>

