class ChakraStockLeftLinksComponentObj {
  // preventing direct access in other places
  #page;
  #mainDashboardLink;
  #nftMarketPlaceLink;
  #dataTablesLink;
  #profileLink;
  #signInLink;
  #rtlAdminLink;

  constructor(page) {
    this.#page = page;
    this.#mainDashboardLink = this.#page.locator('a[href*="/admin/default"]');
    this.#nftMarketPlaceLink = this.#page.locator(
      'a[href*="/admin/nft-marketplace"]'
    );
    this.#dataTablesLink = this.#page.locator('a[href*="/admin/data-tables"]');
    this.#profileLink = this.#page.locator('a[href*="/admin/profile"]');
    this.#signInLink = this.#page.locator('a[href*="/admin/sign-in"]');
    this.#rtlAdminLink = this.#page.locator('a[href*="/admin/rtl-default"]');
  }

  getPage() {
    return this.#page;
  }

  getMainDashboardLink() {
    return this.#mainDashboardLink;
  }

  getNftMarketPlaceLink() {
    return this.#nftMarketPlaceLink;
  }

  getLinkLocator(navPath) {
    return this.#page.locator(`a[href*="/${navPath}"]`);
  }
}

module.exports = ChakraStockLeftLinksComponentObj;
