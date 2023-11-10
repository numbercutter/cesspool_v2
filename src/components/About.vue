<template>
    <div class="about-container">
      <div class="modal-container">
        <div class="header-section">
          <h3 class="intro">Dear Demons,</h3>
          <p class="intro-p">
            Embrace the chaos, for CESSPOOL is not just a token, it's a revelation in the absurd. We're the epitome of a 'shitcoin'. Owning $CESS is a conscious dive into the murky waters of the crypto realm. It's an act of rebellion, a nod to the anarchy of the virtual world.
            <br><br>
            CESSPOOL is a crucible of gaming and decentralized finance experiments.
            <br><br>
            Do not buy our token, this project is about community building. 
            <br><br>
            Dive into the CESSPOOL. Be part of our venture into the unknown.
            <br><br>
            Dare to deFi,
            <br>
            Pla_cebro
          </p>
        </div>
        <a :href="'https://discord.gg/rAVpSHYebQ'" class="discord-button" target="_blank">
        Join the Discord
        </a>
        <a :href="'https://twitter.com/cesspoolcompany'" class="twitter-button" target="_blank">
          Follow on X
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About'
  }
  </script>
  
  <style scoped>
  .about-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: white;
    background-color: #2a2a2a; /* Dark grey background */
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin: 30px auto;
  }
  
  .modal-container {
    background-color: #333333; /* Slightly lighter grey for the modal */
    padding: 20px;
    border-radius: 10px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .header-section {
    text-align: center;
  }
  
  .intro {
    font-size: 24px;
    color: rgb(102, 255, 0); /* Bright green color */
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
  
  .intro-p {
    text-align: left;
    line-height: 1.6;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9); /* Slightly off-white for readability */
    max-width: 700px;
    margin: auto;
  }
  .discord-button, .twitter-button {
  display: inline-block;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.discord-button {
  background-color: #5865F2; /* Discord's brand color */
}

.discord-button:hover {
  background-color: #4e5bd4; /* Slightly darker on hover */
}

.twitter-button {
  background-color: #000000; /* Twitter's brand color */
  margin-left: 10px; /* Space between buttons */
}

.twitter-button:hover {
  background-color: #1a91da; /* Slightly darker on hover */
}
  </style>
  