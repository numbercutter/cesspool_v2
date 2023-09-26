<template>
  <router-link 
    :to="{ name: name,
          state: { tokenId: vehicles,
                  tokenName: name,
                  tokenImg: image,
                  tokenInfo: approximateReturn
           },}">
    <div class="shitcan_container">
      <div class="shitcan_wrapper">
        <div class="shitcan_card shimmer">
          <div class="shitcan_content">
            <div class="shitcan_id">{{ vehicles }}</div>
            <div class="shitcan_img"><img v-bind:src="image" alt="" width="200"></div>
            <div class="shitcan_price">{{ availableEarnings }}</div>
          </div>
          
          <div class="shitcan_footer">
            <div class="shitcan_name">{{ name }}</div>
            <div class="shitcan_description">{{ approximateReturn }}</div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
    name: "ShitcanCard",
    props: {
        name: String,
        image: String,
        vehicles: String,
        availableEarnings: String,
        approximateReturn: String,
    }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.shitcan_container {
    max-width: 100%;
    overflow: hidden;
}
.shitcan_wrapper {
    margin-top: 10px;
    @media (min-width: 768px) {
        margin: 10px;
    }
    
}
.shitcan_card {
    background-color: rgb(112, 100, 28);
    color: white;
    border-radius: 8px;
    border: 1px solid black;
    transition: all .2s ease;
    overflow: hidden;
    display: grid;
    width: 252px;
    height: 308px;

    .shitcan_content {
      position: relative;
      background-image: linear-gradient(90deg, #80fa61 0%, #fff8b5 100%);
      

      .shitcan_id {
        background-color: black;
        border-radius: 5px;
        position: absolute;
        padding: 5px;
        top: 10px;
        right: 10px;
      }
      .shitcan-img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        overflow: hidden;

        border: 1px solid #c0c6ce00;
        border-radius: 20%;
        @media (min-width: 400px) {
          width: 100px;
          height: 100px;
        }
        @media (min-width: 900px) {
          width: 350px;
          height: 350px;
        }
      }
      .shitcan_price {
        color: black;
        margin-top: 20px;
        width: 100%;
        display: block;
        text-align: center;
      }
      
    }
    .shitcan_footer {
      background-color: black;
      display: block;
      padding: 20px;
    }
    
}
.shitcan_card:hover {
  transform: scale(1.01);
  transform: translateY(-5px);
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
  border: 1px solid #d0d0d0;
}
.shimmer {
  mask:linear-gradient(-60deg,rgb(255, 253, 161) 30%,rgba(255, 236, 126, 0.466),rgb(255, 218, 218) 70%) right/400% 100%;
  animation: shimmer 2.5s 1;

}

@keyframes shimmer {
  100% {mask-position:left}
}
</style>
