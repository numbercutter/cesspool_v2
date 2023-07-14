<template>
  <div class="content_grid marketplace">
    <div class="top_container">
      <h1>Shitcans</h1>
    </div>
    <div class="filter_container">
      <Filter/>
    </div>
    <div class="grid_container">
      <ShitcanGrid :gridTitle="gridTitle"/>
    </div>
  </div>
</template>

<script>
import ShitcanGrid from '@/components/ShitcanGrid.vue';
import Filter from '@/components/Filter.vue';
import { ref } from 'vue';

export default {
  name: "Shitcans",
  components: {
    ShitcanGrid,
    Filter
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
