export default async function handler(req, res) {
  const {
    q = "",
    language = "en",
    searchIn = "title",
    sortBy = "publishedAt",
    pageSize = "20",
  } = req.query;

  const apiKey = process.env.NEWSAPI_KEY;

  if (!apiKey) {
    return res.status(500).json({ status: "error", message: "Missing NEWSAPI_KEY" });
  }

  const params = new URLSearchParams({
    q,
    language,
    searchIn,
    sortBy,
    pageSize,
  });

  const url = "https://newsapi.org/v2/everything?" + params.toString();

  try {
    const r = await fetch(url, { headers: { "X-Api-Key": apiKey } });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ status: "error", message: e?.message || "Proxy error" });
  }
}