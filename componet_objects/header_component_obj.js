class HeaderComponentObj {
  #page;
  #breadCrumbList;
  #root;

  constructor(page) {
    this.#page = page;
    this.#root = this.#page.locator("div[transition-property]");
    this.#breadCrumbList = this.#page.locator(
      "div[transition-property] .chakra-breadcrumb__list li"
    );
  }

  getHeaderRootElement() {
    return this.#root;
  }

  getBreadCrumbList() {
    return this.#breadCrumbList;
  }
}

module.exports = HeaderComponentObj;
