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
      <div
        v-for="article in filteredArticles"
        :key="article.url"
        class="article-card"
      >
        <div class="article-image">
          <img
            :src="article.urlToImage || '/placeholder-image.jpg'"
            :alt="article.title"
            class="article-img"
            @error="handleImageError"
          />
        </div>
        <div class="article-content">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-source">
            {{ article.source?.name }} - {{ formatDate(article.publishedAt) }}
          </p>
          <p class="article-description">
            {{ truncateDescription(article.description) }}
          </p>
          <router-link
            :to="{
              name: 'readmore',
              query: {
                title: article.title,
                description: article.description,
                author: article.author,
                publishedAt: article.publishedAt,
                url: article.url,
                urlToImage: article.urlToImage,
                content: article.content,
              },
            }"
            class="read-more"
          >
            Read more
          </router-link>
        </div>
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
      return this.category.charAt(0).toUpperCase() + this.category.slice(1);
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

      const apiKey = process.env.VUE_APP_NEWS_API_KEY;

      if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        this.error = "Please configure your News API key in the .env file";
        this.loading = false;
        return;
      }

      const url =
        "https://newsapi.org/v2/top-headlines?" +
        new URLSearchParams({
          category,
          pageSize: "20",
          apiKey,
        }).toString();

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "ok") {
          this.articles = data.articles;
        } else {
          throw new Error(data.message || "Failed to fetch news articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        this.error =
          error.message || "Failed to load news articles. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    async fetchSearch(q) {
      this.loading = true;
      this.error = null;

      const apiKey = process.env.VUE_APP_NEWS_API_KEY;
      if (!apiKey) {
        this.error = "Please configure your News API key in the .env file";
        this.loading = false;
        return;
      }

      const url =
        `https://newsapi.org/v2/everything?` +
        new URLSearchParams({
          q,
          language: "en",
          searchIn: "title",
          sortBy: "publishedAt",
          pageSize: "20",
          apiKey,
        }).toString();

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.status === "ok") this.articles = data.articles ?? [];
        else throw new Error(data.message || "Failed to fetch news articles");
      } catch (err) {
        this.error = err.message || "Failed to load news articles.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
    truncateDescription(description) {
      if (!description) return "No description available.";
      return description.length > 120
        ? description.substring(0, 120) + "..."
        : description;
    },
    handleImageError(event) {
      event.target.src = "/placeholder-image.jpg";
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

.article-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.article-image {
  height: 200px;
  overflow: hidden;
}

.article-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-img {
  transform: scale(1.05);
}

.article-content {
  padding: 1.5rem;
}

.article-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  line-height: 1.4;
}

.article-source {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.article-description {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.read-more:hover {
  background-color: #0056b3;
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
