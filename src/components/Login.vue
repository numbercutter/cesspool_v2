<template>
    <div class="navbar-container">
      <!-- Login Module -->
      <div class="login-module">
        <p v-if="!isAuthenticated">Connect with Metamask</p>
        <button v-if="!isAuthenticated" @click="metaLogin">Connect</button>
        <div v-else class="user-info">
          <p>Connected</p>
          <p>Account: {{ address.slice(0, 4) }}...{{ address.slice(address.length - 4) }}</p>
        </div>
      </div>
  
      <!-- Right Side Content -->
      <div class="right-content">
        <h1 class="brand-title">CESSPOOL</h1>
        <div class="button-container">
          <!-- Button Links -->
          <a :href="'https://poocoin.app/tokens/0x40e8b78546fc1f38758799858742950654e7364b'" class="button-link" target="_blank">Chart</a>
          <a :href="'https://bscscan.com/token/0x40e8b78546fc1f38758799858742950654e7364b'" class="button-link" target="_blank">BSCSCAN</a> 
          <a :href="'https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x40e8b78546fc1f38758799858742950654e7364b'" class="button-link" target="_blank">Swap</a>
        </div>
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
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: rgb(0, 0, 0);
  }
  
  .login-module {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start; /* Align left-side elements to the left */
  }
  
  .user-info p {
    margin: 0;
  }
  
  .button-container {
    display: flex;
    gap: 10px;
    justify-content: flex-end; /* Align right-side elements to the right */
  }
  
  .button-link {
    background-color: rgb(255, 0, 119);
    color: white;
    padding: 5px 15px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
  }
  
  .button-link:hover {
    background-color: #367c39;
  }
  
  .brand-title {
    font-size: 18px;
    margin-right: 10px;
  }
  
  @media (max-width: 768px) {
    .navbar-container {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .right-content {
      margin-top: 10px;
    }
  }
  
  @media (max-width: 320px) {
    .navbar-container {
      flex-direction: column;
      align-items: center;
      padding: 10px;
    }
  
    .login-module, .right-content {
      width: 100%;
      text-align: center;
    }
  
    .button-link {
      padding: 5px 10px;
      font-size: 12px;
    }
  
    .brand-title {
      font-size: 16px;
    }
  }
  </style>
  