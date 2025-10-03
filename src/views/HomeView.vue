<template>
  <div class="home">
    <h1>Explore global news in one click</h1>
    <search-bar />
    <h2>Theme suggestions</h2>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
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

<style>
.home {
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home h1 {
  font-size: 3rem;
  margin-bottom: 100px;
}

.home nav {
  padding: 30px;
  display: flex;
  justify-content: space-evenly;
  width: 25vh;
}

.home nav a {
  background-color: white;
  border: 2px solid blue;
  border-radius: 15px;
  padding: 5px;
}
</style>
