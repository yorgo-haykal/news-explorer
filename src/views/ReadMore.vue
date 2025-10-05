<template>
  <div class="readmore">
    <div class="article-card">
      <div class="article-inner">
        <!-- Titre -->
        <h1 class="article-title">{{ article.title }}</h1>

        <!-- Description -->
        <p class="article-description">{{ article.description }}</p>

        <!-- Auteur + Date -->
        <div class="article-meta">
          <span v-if="article.author">By {{ article.author }}</span>
          <span v-if="article.publishedAt">
            • {{ formatDate(article.publishedAt) }}</span
          >
        </div>

        <!-- Image -->
        <div class="article-image" v-if="article.urlToImage">
          <img
            :src="article.urlToImage"
            :alt="article.title"
            @error="handleImageError"
          />
        </div>

        <!-- Contenu complet -->
        <div class="article-content">
          <p v-if="article.content">{{ article.content }}</p>
          <p v-else-if="article.description">{{ article.description }}</p>
          <p v-else>No content available for this article.</p>

          <a
            v-if="article.url"
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full article
          </a>
        </div>

        <!-- Bouton retour -->
        <a @click="$router.go(-1)" class="back-button">← Back</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadMoreView",
  data() {
    return {
      article: {},
    };
  },
  mounted() {
    // Récupère les données passées par Explore.vue via query
    this.article = {
      title: this.$route.query.title,
      description: this.$route.query.description,
      author: this.$route.query.author,
      publishedAt: this.$route.query.publishedAt,
      url: this.$route.query.url,
      urlToImage: this.$route.query.urlToImage,
      content: this.$route.query.content,
    };
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    handleImageError(event) {
      event.target.src = "/placeholder-image.jpg";
    },
  },
};
</script>

<style scoped>
.readmore {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}

.article-card {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
}
.article-inner {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}
.article-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.article-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1rem;
  text-align: center;
}

.article-meta {
  display: flex;
  justify-content: center;
  color: #777;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.article-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  color: #333;
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  white-space: pre-line;
}

.back-button {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
