export default async function handler(req, res) {
  const { category = "general", country = "us", pageSize = "20", q } = req.query;
  const apiKey = process.env.NEWSAPI_KEY; // set on Vercel

  if (!apiKey) {
    return res.status(500).json({ status: "error", message: "Missing NEWSAPI_KEY" });
  }

  const params = new URLSearchParams({
    country,
    category,
    pageSize,
  });
  if (q) params.set("q", q);

  const url = "https://newsapi.org/v2/top-headlines?" + params.toString();

  try {
    const r = await fetch(url, { headers: { "X-Api-Key": apiKey } });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ status: "error", message: e?.message || "Proxy error" });
  }
}