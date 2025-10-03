<template>
  <div class="home">
    <h1>Explorez l’actualité mondiale en un clic</h1>
    <SearchBar />

    <div class="themes">
      <h2>Suggestions de thèmes</h2>
      <div class="theme-buttons">
        <button>Politique</button>
        <button>Sport</button>
        <button>Technologie</button>
        <button>Économie</button>
      </div>
    </div>

    <router-link to="/explore" class="explore-button">Explorer →</router-link>
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
}

.themes h2 {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
}

.theme-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.theme-buttons button {
  background-color: white;
  border: 2px solid #007bff;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;
}

.theme-buttons button:hover {
  background-color: #007bff;
  color: white;
}

.explore-button {
  margin-top: 3rem;
  background-color: #007bff;
  color: white;
  border-radius: 25px;
  padding: 10px 30px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s ease;
}

.explore-button:hover {
  background-color: #0056b3;
}
</style>
