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
        <NftCard 
            :nftId="'222222'"
            :nftImg="'https://static01.nyt.com/images/2014/07/23/upshot/23UP-cat/23UP-cat-articleLarge.jpg?quality=75&auto=webp&disable=upscale'"
            :nftPrice="'$222'"
            :nftName="'Johnny'"
            :nftInfo="'THE DEMON SLAYER'"
        
            />
        <NftCard 
            :nftId="'333333'"
            :nftImg="'http://frontpagemeews.com/wp-content/uploads/2019/05/Webp.net-resizeimage.png'"
            :nftPrice="'$333'"
            :nftName="'Ralph'"
            :nftInfo="'THE DESTROYER'"
        
            />
        <NftCard 
            :nftId="'444444'"
            :nftImg="'https://i.insider.com/61d1c0e2aa741500193b2d18?width=750&format=jpeg&auto=webp'"
            :nftPrice="'$444'"
            :nftName="'Natahan'"
            :nftInfo="'THE GOOD TWIN'"
        
            />
            <NftCard 
            :nftId="'222222'"
            :nftImg="'https://static01.nyt.com/images/2014/07/23/upshot/23UP-cat/23UP-cat-articleLarge.jpg?quality=75&auto=webp&disable=upscale'"
            :nftPrice="'$222'"
            :nftName="'Johnny'"
            :nftInfo="'THE DEMON SLAYER'"
        
            />
        <NftCard 
            :nftId="'333333'"
            :nftImg="'http://frontpagemeews.com/wp-content/uploads/2019/05/Webp.net-resizeimage.png'"
            :nftPrice="'$333'"
            :nftName="'Ralph'"
            :nftInfo="'THE DESTROYER'"
        
            />
        <NftCard 
            :nftId="'444444'"
            :nftImg="'https://i.insider.com/61d1c0e2aa741500193b2d18?width=750&format=jpeg&auto=webp'"
            :nftPrice="'$444'"
            :nftName="'Natahan'"
            :nftInfo="'THE GOOD TWIN'"
        
            />
            <NftCard 
            :nftId="'222222'"
            :nftImg="'https://static01.nyt.com/images/2014/07/23/upshot/23UP-cat/23UP-cat-articleLarge.jpg?quality=75&auto=webp&disable=upscale'"
            :nftPrice="'$222'"
            :nftName="'Johnny'"
            :nftInfo="'THE DEMON SLAYER'"
        
            />
        <NftCard 
            :nftId="'333333'"
            :nftImg="'http://frontpagemeews.com/wp-content/uploads/2019/05/Webp.net-resizeimage.png'"
            :nftPrice="'$333'"
            :nftName="'Ralph'"
            :nftInfo="'THE DESTROYER'"
        
            />
        <NftCard 
            :nftId="'444444'"
            :nftImg="'https://i.insider.com/61d1c0e2aa741500193b2d18?width=750&format=jpeg&auto=webp'"
            :nftPrice="'$444'"
            :nftName="'Natahan'"
            :nftInfo="'THE GOOD TWIN'"
        
            />
            <NftCard 
            :nftId="'222222'"
            :nftImg="'https://static01.nyt.com/images/2014/07/23/upshot/23UP-cat/23UP-cat-articleLarge.jpg?quality=75&auto=webp&disable=upscale'"
            :nftPrice="'$222'"
            :nftName="'Johnny'"
            :nftInfo="'THE DEMON SLAYER'"
        
            />
        <NftCard 
            :nftId="'333333'"
            :nftImg="'http://frontpagemeews.com/wp-content/uploads/2019/05/Webp.net-resizeimage.png'"
            :nftPrice="'$333'"
            :nftName="'Ralph'"
            :nftInfo="'THE DESTROYER'"
        
            />
        <NftCard 
            :nftId="'444444'"
            :nftImg="'https://i.insider.com/61d1c0e2aa741500193b2d18?width=750&format=jpeg&auto=webp'"
            :nftPrice="'$444'"
            :nftName="'Natahan'"
            :nftInfo="'THE GOOD TWIN'"
        
            />
    </div>
  </div>
</template>

<script>
import NftCard from '@/components/NftCard.vue';


export default {
    name: "NftGrid",
    components: {
        NftCard
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

