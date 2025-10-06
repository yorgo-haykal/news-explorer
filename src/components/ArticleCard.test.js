import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ArticleCard from "./ArticleCard.vue";

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

describe("ArticleCard.vue", () => {
  const wrapper = mount(ArticleCard, {
    props: {
      article: {
        ...baseArticle
      }
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      },
    },
  });

  it("renders correctly", () => {
    expect(wrapper.find("img").attributes("src")).toBe(baseArticle.urlToImage);
    expect(wrapper.find(".article-title").text()).toBe(baseArticle.title);
  });

  it("has a read more link that works", async () => {
    const link = wrapper.findComponent(RouterLinkStub);
    expect(link.exists()).toBeTruthy;

    const to = link.props("to");
    expect(to.name).toBe("readmore");
    expect(to.query.title).toBe("OpenAI ships new model");
    expect(to.query.url).toBe("https://example.com/article");
  });
});