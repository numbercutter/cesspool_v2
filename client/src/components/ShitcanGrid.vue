<template>
    <div class="listing_container">
      <div class="filter">
          <h1>{{ gridTitle }}</h1>
          <label for="cars">Filter:</label>
          <select name="cars" id="cars">
              <option value="volvo">Lowest Price</option>
              <option value="saab">Highest Price</option>
              <option value="opel">Lowest ID</option>
              <option value="audi">Highest ID</option>
          </select>
      </div>
      <div class="grid">
          <ShitcanCard 
              :name="'CESS4CESSDetails'"
              :image="'https://static01.nyt.com/images/2014/07/23/upshot/23UP-cat/23UP-cat-articleLarge.jpg?quality=75&auto=webp&disable=upscale'"
              :vehicles="'222222'"
              :availableEarnings="'$222'"
              :approximateReturn="'THE DEMON SLAYER'"
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
  
