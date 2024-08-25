class HeaderComponentObj {
  #breadCrumbList;
  #root;
  #searchBox;

  constructor(root) {
    this.#root = root;
    this.#breadCrumbList = this.#root.locator(
      ".chakra-breadcrumb__list li"
    );

    this.#searchBox = this.#root.locator("input");
  }

  getBreadCrumbList() {
    return this.#breadCrumbList;
  }

  getSearchBox() {
    return this.#searchBox;
  }
}

module.exports = HeaderComponentObj;
