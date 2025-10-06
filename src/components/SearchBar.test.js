import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "./SearchBar.vue";

describe("SearchBar.vue", () => {
  it("renders and launches search", async () => {
    const push = vi.fn();
    const wrapper = mount(SearchBar, {
      global: {
        mocks: {
          $router: { push },
        },
      },
    });

    expect(wrapper.text()).toContain("search");

    const input = wrapper.find("input");
    await input.setValue("Trump");

    await wrapper.find('form').trigger('submit.prevent');

    expect(push).toHaveBeenCalledWith({
      name: "explore",
      query: { q: "Trump" },
    });
  });
});