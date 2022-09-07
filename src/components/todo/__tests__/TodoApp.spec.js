import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import TodoApp from "../TodoApp.vue";

describe("TodoApp", () => {
  it("renders properly", () => {
    const data = mount(TodoApp, { props: { headingTest: "TODO List:" } });
    expect(data.html()).toContain("TODO List:");
  });
});
