import {UIActions} from '../framework/UIActions';
import {expect} from '@playwright/test';
import {ChakraStockLeftLinksComponentObj} from '../componet-objects/Chakra-Stock-Left-Links-Component-Obj';
//import {Element} from '../framework/enum/Element'

export class ChakraStockLeftLinksComponent {

    constructor(page) {
       this.page = page;
       this.chakraStockLeftLinksComponentObj = new ChakraStockLeftLinksComponentObj(this.page);
    }

    async mainDashboardIsAutoSelected() {
        const locator = this.chakraStockLeftLinksComponentObj.getMainDashboardLink();
        await expect(locator).toHaveAttribute('aria-current', 'page');
        await expect(locator).toHaveAttribute('class', 'active');
    }

    async navigateToNftMarketPlace() {
        const locator = this.chakraStockLeftLinksComponentObj.getNftMarketPlaceLink();
        const uiActions = new UIActions(locator);
        await uiActions.click();
        await expect(locator).toHaveAttribute('aria-current', 'page');
        await expect(locator).toHaveAttribute('class', 'active');

    }

 }

