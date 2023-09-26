<template>
  <div class="content_grid home">
    <div class="top_container">
      <div class="top_content">
        <h1>CESSPOOL.COMPANY</h1>
        <p>EAT SHIT, GET RUGGED</p>
      </div>
    </div>
    
    <div class="filter_container">
      <select name="menu" id="menu" v-model="selectedSection">
        <option value="about">About</option>
        <option value="team">Team</option>
        <option value="tokenomics">Tokenomics</option>
        <option value="tools">Tools</option>
      </select>
    </div>
    
    <div v-if="selectedSection === 'about'" class="landing_container">
      <div class="modal-container">
        <div class="header-section">
          <h3 class="intro">Dear Demons,</h3>
          <p class="intro-p" style="text-align: left; display: inline-block; padding: 0px 0px;">
            CESSPOOL is more than a token... it's a religion.<br><br>
            The concept was birthed from the idea that the virtual world is a shithole full of demon tactics. <br>
            With so many crypto projects/influencers scamming their way to riches, CESSPOOL puts a mirror to this by openly telling investors that it is scamming them. <br><br>
            Latching onto dark humor, reverse psychology and unorothodox marketing tactics, $CESS is a POOL of constant suprises. <br><br>
            Everyone has a demon side. Do you have the guts to face it? <br><br>
            DEMON UP,
            <br>
            Mr. CESS
          </p>
        </div>
      </div>
    </div>
    <div v-if="selectedSection === 'team'">
      <h2>Our Team</h2>
      <p>Meet our dedicated team of professionals...</p>
    </div>
    <div v-if="selectedSection === 'tokenomics'">
      <h2>Tokenomics</h2>
      <p>Learn about our token structure and distribution...</p>
    </div>
    <div v-if="selectedSection === 'tools'">
      <h2>Tools</h2>
      <p>Explore our range of tools and services...</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    const selectedSection = ref('about'); // Default selection
    return { selectedSection };
  }
}
</script>

<style scoped>
  /* Add your styling here */
</style>
