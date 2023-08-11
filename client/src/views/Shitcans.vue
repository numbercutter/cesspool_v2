<template>
  <div class="content_grid marketplace">
    <div class="top_container">
      <h1>Shitcans</h1>
    </div>
    <div class="grid_container">
      <ShitcanGrid :gridTitle="gridTitle"/>
    </div>
  </div>
</template>

<script>
import ShitcanGrid from '@/components/ShitcanGrid.vue';
import { ref } from 'vue';

export default {
  name: "Shitcans",
  components: {
    ShitcanGrid,
  },
  setup() {
    const gridTitle = ref("Shitcans");
    return { gridTitle };
  }
}
</script>

<style lang="scss" scoped>
/* Add your custom styles here */
</style>
