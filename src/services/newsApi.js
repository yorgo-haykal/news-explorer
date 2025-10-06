const BASE = "https://newsapi.org/v2";
const KEY = process.env.VUE_APP_NEWS_API_KEY; // or call your proxy: base "/api"

async function call(path, params) {
  const url =
    BASE + path + "?" + new URLSearchParams({ ...params, apiKey: KEY });
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
  console.log(KEY);
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
