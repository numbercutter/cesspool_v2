 <template>
  <div class="content_grid home">
    <div class="top_container">
      <div class="top_content">
        <h1>CESSPOOL</h1>
        <h2>EAT SHIT, GET RUGGED</h2>
        <br>
        <div class="button-container">
          <a :href="'https://poocoin.app/tokens/0x40e8b78546fc1f38758799858742950654e7364b'" class="button-link" target="_blank">
            Poocoin Chart
          </a>
          <a :href="'https://bscscan.com/token/0x40e8b78546fc1f38758799858742950654e7364b'" class="button-link" target="_blank">
            BSCSCAN
          </a> 
          <a :href="'https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x40e8b78546fc1f38758799858742950654e7364b'" class="button-link" target="_blank">
            PANCAKESWAP
          </a>
        </div> 
      </div>
    </div>
    
    <ul class="tab-bar">
      <li @click="selectedSection = 'about'" :class="{ active: selectedSection === 'about' }">About</li>
      <li @click="selectedSection = 'gaming'" :class="{ active: selectedSection === 'gaming' }">Gaming</li>
      <li @click="selectedSection = 'tokenomics'" :class="{ active: selectedSection === 'tokenomics' }">Tokenomics</li>
      <li @click="selectedSection = 'tools'" :class="{ active: selectedSection === 'tools' }">Tools</li>
    </ul>
    <div v-if="selectedSection === 'about'" class="landing_container">
      <About/>
    </div>

    <div v-if="selectedSection === 'gaming'">
      <h2>Esports Gaming Team</h2>
      <p>Coming Soon...</p>
    </div>
    <div v-if="selectedSection === 'tokenomics'">
      <Tokenomics/>
    </div>
    <div v-if="selectedSection === 'tools'">
      <h2>Tools</h2>
      <p>Coming Soon...</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Tokenomics from '@/components/Tokenomics.vue';
import About from '@/components/About.vue';

export default {
  name: "Home",
  components: {
    Tokenomics,
    About
  },
  setup() {
    const selectedSection = ref('about'); // Default selection
    return { selectedSection };
  }
}
</script>

<style scoped>
.tab-bar {
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  background-color: #333;
  /* Styles for larger screens */
}

.tab-bar li {
  padding: 15px 30px;
  cursor: pointer;
  color: white;
  border-bottom: 3px solid transparent;
}

/* ... other styles ... */

/* Mobile styles */
@media (max-width: 768px) {
  .tab-bar {
    flex-direction: column; /* Stack tabs vertically */
  }

  .tab-bar li {
    padding: 15px; /* Adjust padding for mobile */
    text-align: center; /* Center text for readability */
    border-bottom: 1px solid #444; /* Add a border between items */
  }

  /* Additional mobile-specific styles can go here */
}

.tab-bar li:hover {
  background-color: #444;
}

.tab-bar li.active {
  color: #4CAF50; /* Highlight color for the active tab */
  border-bottom: 3px solid #4CAF50; /* Active tab */
}
.button-link {
  display: inline-block;
  background-color: #000000; /* Example button color */
  color: rgb(255, 0, 255);
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.button-link h1 {
  margin: 0;
  font-size: 20px;
}
.button-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px; /* Add space between buttons */
  margin-top: 20px;
}

.button-link {
  background-color: #000000; /* Example button color */
  color: rgb(255, 0, 255);
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-link:hover {
  background-color: #333333; /* Darken button on hover */
}

@media (max-width: 768px) {
  .button-link {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
