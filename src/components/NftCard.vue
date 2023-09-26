<template>
  <router-link 
    :to="{ name: 'NftDetails',
          params: { id: nftId},
          state: { tokenId: nftId,
                  tokenName: nftName,
                  tokenImg: nftImg,
                  tokenInfo: nftInfo
           },}">
    <div class="nft_container">
      <div class="nft_wrapper">
        <div class="nft_card shimmer">
          <div class="nft_content">
            <div class="nft_id">{{nftId}}</div>
            <div class="nft_img"><img v-bind:src="nftImg" alt="" width="200"></div>
            <div class="nft_price">{{nftPrice}}</div>
          </div>
          
          <div class="nft_footer">
            <div class="nft_name">{{nftName}}</div>
            <div class="nft_description">{{nftInfo}}</div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
    name: "NftCard",
    props: {
        nftId: String,
        nftImg: String,
        nftPrice: String,
        nftName: String,
        nftInfo: String,

    }
}
</script>

<style lang="scss" scoped>

a {
  text-decoration: none;
}
.nft_container {
    max-width: 100%;
    overflow: hidden;
}
.nft_wrapper {
    margin-top: 10px;
    @media (min-width: 768px) {
        margin: 10px;
    }
    
}
.nft_card {
    background-color: rgb(112, 100, 28);
    color: white;
    border-radius: 8px;
    border: 1px solid black;
    transition: all .2s ease;
    overflow: hidden;
    display: grid;
    width: 252px;
    height: 308px;

    .nft_content {
      position: relative;
      background-image: linear-gradient(90deg, #80fa61 0%, #fff8b5 100%);
      

      .nft_id {
        background-color: black;
        border-radius: 5px;
        position: absolute;
        padding: 5px;
        top: 10px;
        right: 10px;
      }
      .nft-img {
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
      .nft_price {
        color: black;
        margin-top: 20px;
        width: 100%;
        display: block;
        text-align: center;
      }
      
    }
    .nft_footer {
      background-color: black;
      display: block;
      padding: 20px;
    }
    
}
.nft_card:hover {
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