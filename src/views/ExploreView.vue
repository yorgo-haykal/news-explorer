<template>
  <div class="explore">
    <div class="page-header">
      <h1>{{ prettyCategory }} News</h1>
      <div class="header-underline"></div>
      <h2>Latest News</h2>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading latest news...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchArticles" class="retry-button">Try Again</button>
    </div>

    <!-- Articles Grid -->
    <div class="articles" v-else>
      <div v-for="article in filteredArticles" :key="article.url">
        <ArticleCard :article="article" />
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && !error && filteredArticles.length === 0"
      class="empty-state"
    >
      <p>No articles found. Please try again later.</p>
    </div>
  </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard.vue";
import { fetchTopHeadlines, searchEverything } from "@/services/newsApi";

const VALID_CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

export default {
  name: "ExploreView",
  components: {
    ArticleCard,
  },
  data() {
    return {
      articles: [],
      loading: true,
      error: null,
    };
  },
  computed: {
    q() {
      return (this.$route.query.q || "").trim();
    },
    category() {
      const c = (this.$route.query.category || "general").toLowerCase();
      return VALID_CATEGORIES.includes(c) ? c : "general";
    },
    prettyCategory() {
      if (this.$route.query.q) {
        return this.q.charAt(0).toUpperCase() + this.q.slice(1);
      } else {
        return this.category.charAt(0).toUpperCase() + this.category.slice(1);
      }
    },
    filteredArticles() {
      return this.articles.filter(
        (article) =>
          article.title &&
          article.title !== "[Removed]" &&
          article.url &&
          article.source?.name
      );
    },
  },
  mounted() {
    this.run();
  },
  watch: {
    "$route.query.q"() {
      this.run();
    },
    "$route.query.category"() {
      this.run();
    },
  },
  methods: {
    async run() {
      if (this.q) {
        await this.fetchSearch(this.q);
      } else {
        await this.fetchTopHeadlines(this.category);
      }
    },
    async fetchTopHeadlines(category) {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchTopHeadlines({ category, pageSize: 20 });
        this.articles = data.articles ?? [];
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchSearch(q) {
      this.loading = true;
      this.error = null;
      try {
        const data = await searchEverything({
          q,
          pageSize: 20,
          language: "en",
          sortBy: "publishedAt",
        });
        this.articles = data.articles ?? [];
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.explore {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 6%;
  background-color: white;
}

.page-header {
  text-align: left;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.header-underline {
  width: 80%;
  height: 4px;
  background-color: black;
  margin-bottom: 1rem;
  border-radius: 2px;
}

.page-header h2 {
  font-size: 1.5rem;
  color: #555;
  margin: 0 0 1.5rem 0;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 1rem 0;
}

.retry-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.retry-button:hover {
  background-color: #0056b3;
}

.articles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .explore {
    padding: 1rem;
  }

  .articles {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .article-content {
    padding: 1rem;
  }

  .article-title {
    font-size: 1.1rem;
  }
}
</style>
