<template>
  <div class="home">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="title-line">Explore Global News</span>
        <span class="title-line accent">in One Click</span>
      </h1>
      <p class="hero-subtitle">
        Stay informed with the latest headlines from around the world
      </p>
      <SearchBar />
    </div>

    <div class="themes-section">
      <h2 class="section-title">Suggested Topics</h2>
      <div class="theme-buttons">
        <button @click="openCategory('business')" class="theme-btn">
          <span class="btn-icon">📈</span>
          Business
        </button>
        <button @click="openCategory('entertainment')" class="theme-btn">
          <span class="btn-icon">🍿</span>
          Entertainment
        </button>
        <button @click="openCategory('health')" class="theme-btn">
          <span class="btn-icon">🩺</span>
          Health
        </button>
        <button @click="openCategory('science')" class="theme-btn">
          <span class="btn-icon">🧪</span>
          Science
        </button>
        <button @click="openCategory('sports')" class="theme-btn">
          <span class="btn-icon">⚽</span>
          Sports
        </button>
        <button @click="openCategory('technology')" class="theme-btn">
          <span class="btn-icon">💻</span>
          Technology
        </button>
      </div>
    </div>

    <router-link to="/explore" class="explore-button">
      <span>General new</span>
      <svg
        class="arrow-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </router-link>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "HomeView",
  components: {
    SearchBar,
  },
  methods: {
    openCategory(cat) {
      this.$router.push({ name: "explore", query: { category: cat } });
    },
  },
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem 3rem;
  background: #eeeaea;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.home::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #007bff, transparent);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  font-weight: 800;
  line-height: 1.1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-line {
  display: block;
}

.title-line.accent {
  color: #007bff;
  position: relative;
}

.title-line.accent::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #007bff, transparent);
  border-radius: 2px;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 3rem;
  font-weight: 400;
  line-height: 1.6;
}

.themes-section {
  margin: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.theme-buttons {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2%;
  max-width: 1250px;
  margin: 0 auto;
}

.theme-btn {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #e8f2ff;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: #007bff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.theme-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.6s;
}

.theme-btn:hover {
  background: #007bff;
  color: white;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 123, 255, 0.25);
  border-color: #007bff;
}

.theme-btn:hover::before {
  left: 100%;
}

.theme-btn:active {
  transform: translateY(-1px) scale(1.01);
}

.btn-icon {
  font-size: 1.2em;
  transition: transform 0.3s ease;
}

.theme-btn:hover .btn-icon {
  transform: scale(1.1);
}

.explore-button {
  margin-top: 2rem;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border-radius: 50px;
  padding: 1.2rem 2.5rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.explore-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s;
}

.explore-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 123, 255, 0.4);
}

.explore-button:hover::before {
  left: 100%;
}

.explore-button:active {
  transform: translateY(-1px);
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.explore-button:hover .arrow-icon {
  transform: translateX(4px);
}

/* Enhanced responsive design */
@media (max-width: 768px) {
  .home {
    padding: 3rem 1.5rem 2rem;
    justify-content: center;
    gap: 3rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .theme-buttons {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 300px;
  }

  .theme-btn {
    padding: 0.9rem 1.2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .home {
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .explore-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

/* Loading animation for buttons */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Focus states for accessibility */
.theme-btn:focus,
.explore-button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
</style>
