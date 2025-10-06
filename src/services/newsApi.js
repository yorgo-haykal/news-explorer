// src/api/newsApi.js
const isProd = process.env.NODE_ENV === "production";

// In production we call your Vercel functions (e.g. /api/top-headlines, /api/everything).
// In development we can call NewsAPI directly.
const BASE = isProd ? "/api" : "https://newsapi.org/v2";
const KEY = process.env.VUE_APP_NEWS_API_KEY; // only used in dev

function buildUrl(path, params) {
  const search = new URLSearchParams(params);

  // Only send the apiKey from the browser in development (localhost)
  if (!isProd) {
    if (!KEY) throw new Error("Missing VUE_APP_NEWS_API_KEY in development");
    search.set("apiKey", KEY);
  }

  return `${BASE}${path}?${search.toString()}`;
}

async function call(path, params) {
  const url = buildUrl(path, params);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== "ok") throw new Error(data.message || "API error");
  return data;
}

export function fetchTopHeadlines({
  country = "us",
  category = "general",
  pageSize = 20,
  page = 1,
} = {}) {
  return call("/top-headlines", { country, category, pageSize, page });
}

export function searchEverything({
  q,
  pageSize = 20,
  page = 1,
  language = "en",
  sortBy = "publishedAt",
} = {}) {
  return call("/everything", { q, pageSize, page, language, sortBy });
}
