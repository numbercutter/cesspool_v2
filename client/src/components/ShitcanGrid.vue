<template>
    <div class="listing_container">
      <div class="grid">
          <ShitcanCard 
              :name="'CESS4CESSDetails'"
              :image="'https://static01.nyt.com/images/2014/07/23/upshot/23UP-cat/23UP-cat-articleLarge.jpg?quality=75&auto=webp&disable=upscale'"
              :vehicles="'CESS 4 CESS VAULT'"
              :availableEarnings="'$222'"
              :approximateReturn="'STAKING VAULT'"
          />
          <ShitcanCard 
              :name="'PSWAPCESSBNBDetails'"
              :image="'https://static01.nyt.com/images/2014/07/23/upshot/23UP-cat/23UP-cat-articleLarge.jpg?quality=75&auto=webp&disable=upscale'"
              :vehicles="'LIQUIDITY POOL VAULT'"
              :availableEarnings="'$333'"
              :approximateReturn="'STAKING VAULT'"
          />
      </div>
    </div>
  </template>
  
  <script>
  import ShitcanCard from '@/components/ShitcanCard.vue';
  
  export default {
      name: "ShitcanGrid",
      components: {
        ShitcanCard
      },
      props: {
          gridTitle: String,
      }
  }
  </script>
  
  <style lang="scss" scoped>
  .listing_container {
      padding: 4px 8px;
  }
  
  .filter {
      display: block;
  }
  
  .grid {
      display: grid;
      justify-content: space-evenly;
      justify-items: center;
      align-content: space-evenly;
      align-items: center;
      grid-gap: 16px;
      padding: 4px;
      min-width: 100%;
  
      grid-template-columns: repeat(1, 1fr);
  
      @media (min-width: 768px) {
          grid-template-columns: repeat(1, 1fr);
          padding: 8px;
      }
      @media (min-width: 960px) {
          grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1200px) {
          grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1450px) {
          grid-template-columns: repeat(4, 1fr);
      }
  }
  </style>
  
