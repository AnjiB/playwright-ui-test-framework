import { HeaderComponentObj } from "../componet-objects/Header-Component-Obj";
import {expect} from "@playwright/test";

export class HeaderComponent {

    constructor(page) {
        this.page = page;
        this.headerComponentObj = new HeaderComponentObj(this.page);
    }

    async assertBreadCrumbLinkContains(expectedText, count) {

        const locator = this.headerComponentObj.getBreadCrumbList();

        await expect(locator.filter({ hasText: expectedText })).toHaveCount(count);
    }

}