import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import HomeView from "@/views/HomeView.vue";

describe("HomeView.vue", () => {
  it("renders the Suggested Topics section and handles category click", async () => {
    const push = vi.fn(); // mock router.push
    const wrapper = mount(HomeView, {
      global: {
        mocks: {
          $router: { push },
        },
      },
    });

    // Check if the section title exists
    expect(wrapper.text()).toContain("Suggested Topics");

    // Find and click the 'Business' button
    const button = wrapper.find("button.theme-btn");
    await button.trigger("click");

    // Check if router.push was called with correct params
    expect(push).toHaveBeenCalledWith({
      name: "explore",
      query: { category: "business" },
    });
  });
});