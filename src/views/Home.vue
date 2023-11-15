 <template>
  <div class="content_grid home"> 
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

</style>
