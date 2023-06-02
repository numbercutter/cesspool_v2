<template>
  <div class="content_grid marketplace">
    <div class="top_container">
      <h1>MARKETPLACE</h1>
    </div>
    <div class="filter_container">
      <Filter/>
    </div>
    <div class="grid_container">
      <NftGrid :gridTitle="gridTitle"/>
    </div>
  </div>
</template>

<script>
import NftGrid from '@/components/NftGrid.vue';
import Filter from '@/components/Filter.vue';
import { ref } from 'vue';

export default {
  name: "Marketplace",
  components: {
    NftGrid,
    Filter
  },
  setup() {
    const gridTitle = ref("Marketplace")
    return { gridTitle }
  }
}
</script>

<style lang="scss" scoped>


</style>