import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ReadMore from "./ReadMore.vue";

const baseArticle = {
  title: "OpenAI ships new model",
  description: "A short description.",
  content: "Full content...",
  author: "Someone",
  publishedAt: "2025-10-01T12:00:00Z",
  url: "https://example.com/article",
  urlToImage: "https://example.com/image.jpg",
  source: { name: "Example News" },
};

describe("ReadMore.vue", () => {
  const go = vi.fn();
  const wrapper = mount(ReadMore, {
    global: {
      mocks: {
        $router: { go },
        $route: { query: { ...baseArticle,} },
      },
    },
  });

  it("renders correctly", () => {
    expect(wrapper.find(".article-title").text()).toBe(baseArticle.title);
    expect(wrapper.find("img").attributes("src")).toBe(baseArticle.urlToImage);
  });

  it("has a working back button", async () => {
    const backButton = wrapper.find(".back-button");
    expect(backButton.exists()).toBeTruthy();

    await backButton.trigger("click");
    expect(go).toHaveBeenCalledWith(-1);
  })
});