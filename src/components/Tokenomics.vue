<template>
  <div class="tokenomics-container">
    <div class="title-container">
      <h1 class="token-allocation-title">TOKEN ALLOCATION</h1>
    </div>
    <div class="lists-container">

      <ul class="token-list">
        <li>Reward Wallet: 200,000 CESS</li>
        <li>Partnership Wallet: 100,000 CESS</li>
        <li>Giveaway Wallet: 50,000 CESS</li>
        <li>Marketing Wallet: 50,000 CESS</li>
        <li>Liquidity: 600,000 CESS</li>
      </ul>
      <ul class="wallet-links">
        <li><a href="https://bscscan.com/address/0x329Ad573cA93A56F18aF20567324C55dCfFdfCCF" class="hov" target="_blank">Developer Wallet #3</a></li>
        <li><a href="https://bsc.gnosis-safe.io/app/#/safes/0x72afA21b2CC9C9a46e712fa171E070dF39a81302/balances" class="hov" target="_blank">Reward Wallet</a></li>
        <li><a href="https://bscscan.com/address/0x7B867201E16eF4F567060e1307B31A708F0b4Da3" class="hov" target="_blank">Developer Wallet #2</a></li>
        <li><a href="https://bscscan.com/address/0xE7cFc59B975D7C18f2d086407c37ecb5be5050e3" class="hov" target="_blank">Developer Wallet #1</a></li>
        <li><a href="https://bsc.gnosis-safe.io/app/#/safes/0xE11aAD079e5FF995a1a4012F77ad79fd30C37c0e/balances" class="hov" target="_blank">Giveaway Wallet</a></li>
        <li><a href="https://bsc.gnosis-safe.io/app/#/safes/0x05942a56C7D3EF2FD465F4A8a7A80d5c66680db1/balances" class="hov" target="_blank">Partnership Wallet</a></li>
        <li><a href="https://bsc.gnosis-safe.io/app/#/safes/0xDf1BC4B7343Ba214dbed067F79E78931564c912c/balances" class="hov" target="_blank">Marketing Wallet</a></li>
        <li><a href="https://bscscan.com/tx/0x8801b5074b3337bdc527b52153c6369b42107701dfcf89955c546a91afe1e651" class="hov" target="_blank">Liquidity Burn</a></li>
      </ul>
      <div class="tokenomics-details">
        <h1 id="tokenomics-title">TOKENOMICS</h1>
        <ul class="tokenomics-list">
          <li>Name: CESSPOOL</li>
          <li>Ticker: CESS</li>
          <li>Total Supply: 1,000,000</li>
          <li>Network: BSC</li>
          <li>Launch Type: Fair</li>
          <li>Launch Date: 11/1/21</li>
          <li>Launch Time: 11:11AM EST</li>
          <li>Transaction Tax: 5%</li>
          <li><a href="https://bscscan.com/tx/0xe2dc1f18385af9bfa88c4ce401fdf3e3d08a29889441b9d714972f6c696ba5fe" target="_blank">Ownership Renounced</a></li> 
          <li>1% Rewards (CESS)</li> 
          <li>3% Developers (BNB)</li>
          <li>0.5% Redistribution (CESS)</li>
          <li>0.5% Liquidity (CESS/BNB)</li>
        </ul>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'Tokenomics'
  }
  </script>
  
  <style scoped>
  .tokenomics-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: white;
    background-color: #1e1e1e; /* Adjust the background color as needed */
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    max-width: 800px; /* Adjust the width as needed */
    margin: auto;
    font-family: 'Arial', sans-serif;

  }
  
  .title-container, .lists-container, .tokenomics-details {
    width: 100%;
    text-align: center;
  }
  
  .token-allocation-title, #tokenomics-title {
    font-size: 50px;
    margin-top: 50px;
    text-shadow: -1px 0 rgb(102, 255, 0), 0 1px rgb(255, 0, 191), 1px 0 rgb(255, 255, 255), 0 -1px rgb(255, 255, 255);
  }
  
  .token-list, .wallet-links, .tokenomics-list {
    list-style-type: none;
    padding: 15px;
    background-color: rgba(3, 3, 3, 0.5); /* Adjust the background color as needed */
    border-radius: 8px;
    margin-top: 30px;
    display: inline-block;
    width: 90%; /* Adjust the width as needed */
    margin: 15px auto;
  }
  
  .token-list li, .wallet-links li, .tokenomics-list li {
    margin: 10px 0;
  }
  
  .wallet-links a, .tokenomics-list a {
    color: rgb(102, 255, 0);
    text-decoration: underline;
  }
  
  .hov:hover {
    color: rgb(255, 0, 191);
  }
  
  /* Add more styles as needed */
  </style>