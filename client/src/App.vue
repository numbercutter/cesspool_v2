<template id="app">
  <body>
    <div class="app_container" :class="{ light_mode: isActive}">
      <!-- Modals -->
      <CustomModal :show="modal.loadingModal" @close="modal.loadingModal = false">
        <div class="modal__content">
          <!-- Loading content here -->
        </div>
      </CustomModal>
      <CustomModal :show="modal.txnModal.status" @close="modal.txnModal.status = false">
        <div class="modal__content">
          <p>{{ modal.txnModal.hash }}</p>
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
        <button @click="modal.loadingModal = !modal.loadingModal">Toggle Loading Modal</button>
        <button @click="modal.txnModal.status = !modal.txnModal.status">Toggle Txn Modal</button>

        <router-view />
      </div>
    </div>
  </body>
</template>
<script>
import NavigationMobile from './components/NavigationMobile.vue';
import NavigationDesktop from './components/NavigationDesktop.vue';
import { ref, reactive } from 'vue'; // Import reactive
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
    const isActive = ref(false);
    const modal = reactive({ // Initialize modal state
      loadingModal: false,
      txnModal: {status: false, hash: ''}
    });
    
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

