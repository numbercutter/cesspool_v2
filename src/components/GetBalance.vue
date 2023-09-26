<template>
  <div>
    {{ balance }}
  </div>
</template>

<script>

//import { cessVaultAddress, cessVaultABI } from './contracts/cess4cess.sol/cess4cess.js';
//import { cesspoolAddress, cesspoolABI } from './contracts/cesspool.sol/cesspool.js';
import { ref, onMounted, watch, computed } from 'vue'
import { useStore } from "vuex";

export default {
    name: "GetBalance",
    setup() {
        const store = useStore()
        const balance = ref(0)
        const setCess = (cess) => store.commit('setCess', cess)

        const getBalance = async () => {
            const { Contract } = require('ethers');
            const address = store.state.address
            const provider = store.state.provider
            const contract = new Contract(store.state.cesspoolContract.address, store.state.cesspoolContract.abi, provider);
            const amount = await contract.balanceOf(address);
            const result = amount / 1e18
            const rounded1 = Number(result.toFixed(0));
            const num = rounded1 - rounded1 % 1;
            setCess(num)
            const internationalNumberFormat = new Intl.NumberFormat('en-US')
            balance.value =internationalNumberFormat.format(num)
            
            return balance.value;
        }
        watch(()=>store.getters.address, function() {
            getBalance()
        });
        onMounted(() => {
            getBalance()
        })

        return {
            balance,
            cess: computed(() => store.state.cess),
        }
    }
}
</script>

<style>

</style>