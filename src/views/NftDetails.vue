<template>
  <div class="details_wrapper">
    <div class="details_container">
      <div class="block_container">
        <div>
          <a  @click="$router.go(-1)"><button>back</button></a>
        </div>
        <div class="name_container">
          <div class="id_container">
            <div class="tag_container">
              <div class="tag_icon"><img v-bind:src="img" width="20"></div>
              <div class="tag_content"><p>{{id}}</p></div>
            </div>
          </div>
          <div>
            <div class="name_content">
              <h1>{{ name }}</h1>
            </div>
          </div>
        </div>
        <div class="full_container">
          <div class="flex_img">
            <img v-bind:src="img" width="380" >
          </div>
        </div>     
      </div>
      <div class="block_container">
        <div class="full_container">
          <div class="details_content">
            <div class="details_about">
              <h1> {{info}}</h1>
              <p>Stats/Traits</p>
            </div>
            <div class="details_auction">
              <h1> AUCTION/SALES</h1>
              <p>Price/Trade History</p>
            </div>
            <div class="details_debit">
              <h1>Purchase Module</h1>
              <p>Buy with Crypto</p>
              <p>Buy with Debit/Credit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  name: "NftDetails",

  setup() {
    const id = history.state.tokenId
    const name = history.state.tokenName
    const img = history.state.tokenImg
    const info = history.state.tokenInfo

    return {
      id,
      name,
      img,
      info
    }
  }
}
</script>

<style lang="scss" scoped>

.block_container {
  display: block;
}
.name_container {
  display: block;
}

.flex_img {
  justify-content: center;
  align-items: center;

}

.id_container {

  align-items: center;
  grid-gap: 5px;
  gap: 5px;
  margin: 10px 0;
}
.full_container {
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
}
.details_about {
  padding: 28px 32px;
    background-color: rgb(88, 88, 88);
    border-radius: 12px;
    border: 1px solid black;
}
.details_auction {
  padding: 28px 32px;
    background-color: rgb(119, 119, 119);
    border-radius: 12px;
    border: 1px solid black;
}
.details_debit {
  padding: 28px 32px;
    background-color: rgb(126, 126, 126);
    border-radius: 12px;
    border: 1px solid black;
}
.tag_container {
  align-items: center;
  background-color: gray;
  border-radius: 8px;
  box-shadow: 0 0 0 1px transparent;
  display: inline-flex;
  justify-content: center;
  padding: 4px 8px;
  transition: box-shadow .2s cubic-bezier(.075,.82,.165,1);
  white-space: nowrap;
  .tag_icon {
    display: inline-block;
    height: 20px;
    margin-right: 4px;
    vertical-align: middle;
    width: 20px;
  }
  .tag_content {
    color: inherit;
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    margin: 0;
    padding: 0;
  }
}

</style>>

