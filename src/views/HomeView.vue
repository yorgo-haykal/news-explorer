<template>
  <div class="home">
    <h1>Explore Global News in One Click</h1>
    <SearchBar />

    <div class="themes">
      <h2>Suggested Topics</h2>
      <div class="theme-buttons">
        <button>Politics</button>
        <button>Sports</button>
        <button>Technology</button>
        <button>Economy</button>
      </div>
    </div>

    <router-link to="/explore" class="explore-button"
      >Explore More →</router-link
    >
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "HomeView",
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.home {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background-color: #f9f9f9;
  text-align: center;
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 2rem;
  color: #333;
  font-weight: 700;
  line-height: 1.2;
}

.themes h2 {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #555;
  font-weight: 600;
}

.theme-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 500px;
}

.theme-buttons button {
  background-color: white;
  border: 2px solid #007bff;
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #007bff;
  font-weight: 500;
}

.theme-buttons button:hover {
  background-color: #007bff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.theme-buttons button:active {
  transform: translateY(0);
}

.explore-button {
  margin-top: 3rem;
  background-color: #007bff;
  color: white;
  border-radius: 25px;
  padding: 12px 35px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
}

.explore-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.3);
}

.explore-button:active {
  transform: translateY(0);
}

/* Responsive design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }

  .themes h2 {
    font-size: 1.3rem;
  }

  .theme-buttons {
    gap: 0.8rem;
  }

  .theme-buttons button {
    padding: 8px 18px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.8rem;
  }

  .home {
    padding: 2rem 1rem;
  }
}
</style>
