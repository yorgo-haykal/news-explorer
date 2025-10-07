<template>
  <div class="article-card">
    <div class="article-image">
      <img
        :src="article.urlToImage || placeholderImage"
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
</template>

<script>
import placeholderImage from "@/assets/placeholder-image.jpg";

export default {
  props: ["article"],
  methods: {
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
      event.target.src = placeholderImage;
    },
  },
};
</script>

<style>
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

@media (max-width: 480px) {
  .article-content {
    padding: 1rem;
  }

  .article-title {
    font-size: 1.1rem;
  }
}
</style>
