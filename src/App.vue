<template>
  <header>
    <router-link to="/" class="logo-link">
      <h1>News Explorer</h1>
    </router-link>
    <div class="header-buttons">
      <button id="explore-buttonhome" @click="goHome">Home</button>
      <button id="explore-button" @click="goExplore">Explore</button>
    </div>
  </header>

  <router-view />

  <footer class="footer">
    <h3 class="footer-title">Discover</h3>
    <nav class="footer-nav">
      <!-- Home -->
      <router-link to="/" :class="{ active: $route.path === '/' }">
        Home
      </router-link>

      <!-- Categories -->
      <router-link
        v-for="cat in categories"
        :key="cat.name"
        :to="{ path: '/explore', query: { category: cat.name } }"
        :class="{ active: $route.query.category === cat.name }"
      >
        {{ cat.label }}
      </router-link>
    </nav>

    <!-- Back to Top Button -->
    <button class="back-to-top" @click="scrollToTop">Back to Top</button>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { name: "general", label: "General" },
        { name: "business", label: "Business" },
        { name: "entertainment", label: "Entertainment" },
        { name: "health", label: "Health" },
        { name: "science", label: "Science" },
        { name: "sports", label: "Sports" },
        { name: "technology", label: "Technology" },
      ],
    };
  },
  methods: {
    goExplore() {
      this.$router.push({ path: "/explore" });
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background-color: lightgrey;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}
.logo-link h1 {
  margin: 0;
  color: black;
}

#explore-button {
  color: #4b4df3;
  background-color: white;
  border: 2px solid #4b4df3;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: large;
  cursor: pointer;
}
#explore-buttonhome {
  background: none;
  border: none;
  color: #4b4df3;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 15px;
}

#explore-button:hover {
  color: white;
  background-color: #4b4df3;
}

#explore-buttonhome:hover {
  color: black;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

nav a {
  font-weight: bold;
  color: #767676;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #4b4df3;
}

nav a.active {
  color: #4b4df3; /* Lien actif en bleu */
}

.footer {
  text-align: center;
  padding: 10px;
  background-color: #eeeaea;
}

.footer-title {
  font-size: 30px;
  margin-bottom: 0px;
}

.footer-nav {
  display: flex;
  justify-content: center;
  gap: 3%;
  flex-wrap: wrap;
}
.back-to-top {
  background: none;
  border: none;
  color: #767676;
  font-size: 18px;
  cursor: pointer;
  padding: 15px;
}
</style>
