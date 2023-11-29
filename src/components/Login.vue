<template>
  <div>
    <p v-if="!isAuthenticated">Please connect with Metamask</p>
    <button v-if="!isAuthenticated" @click="metaLogin">Connect Metamask</button>
    <div v-else>
        <p>Connected with Metamask</p>
        <p>Account: {{ address.slice(0, 4) }}...{{ address.slice(address.length - 4) }}</p>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { ethers } from "ethers";
import { handleLogin, handleCurrentUser, handleAccountChange, setupNetworkChangeListener, setupAccountChangeListener } from '../api/ethersConnect';

export default {
    name: "Login",
    setup() {
        const store = useStore()

        const metaLogin = async () => {
            await handleLogin(store);
        }

        if (window.ethereum) {
          window.ethereum.on('accountsChanged', (accounts) => {
              handleAccountChange(store, accounts);
          });
          
          const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
          provider.on("network", (newNetwork, oldNetwork) => {
              if (oldNetwork) {
              window.location.reload();
              }
          });
          }


        onMounted(() => {
            handleCurrentUser(store);
            setupNetworkChangeListener();
            setupAccountChangeListener();
        })

        return {
            isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
            address: computed(() => store.state.address),
            metaLogin,
        }
    },
    created() {
        handleCurrentUser(this.$store);
    }
}
</script>

<style>

</style>
