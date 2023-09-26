<!-- src/components/CustomModal.vue -->
<template>
  <div v-if="show" class="modal" @click="closeModalOnOutsideClick">
    <div class="modal-content" @click.stop>
      <button @click="closeModal" class="close-button">X</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close');
    };

    const closeModalOnOutsideClick = (event) => {
      if (event.target.classList.contains('modal')) {
        closeModal();
      }
    };

    return {
      closeModal,
      closeModalOnOutsideClick,
    };
  },
});
</script>

  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* or higher depending on the context */

  }
  
  .modal-content {
    background: #000000;
    padding: 20px;
    border-radius: 8px;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  </style>
  
  