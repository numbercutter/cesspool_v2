<template>
  <div class="content_grid home">
    <div class="top_container">
      <div class="top_content">
        <h1>CESSPOOL.COMPANY</h1>
        <p>EAT SHIT, GET RUGGED</p>
      </div>
    </div>
    <div class="login_container">
      <Login/>
    </div>
    <div class="filter_container">
      <Filter/>
    </div>

  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Filter from '@/components/Filter.vue';
import { ref } from 'vue';

export default {
  name: 'Home',
  components: {
    Login,
    Filter
  },
  setup() {
    const gridTitle = ref("User Collection")
    return { gridTitle }
  }

}
</script>


<style lang="scss" scoped>

</style>