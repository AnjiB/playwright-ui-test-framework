import {test} from '@playwright/test';

export class PageUtil {

    constructor(page) {
        this.page = page;
    }

    async launchApp(path) {
        await test.step('Launching App', async () => {
            await this.page.goto(`${path}`);
            await this.page.waitForLoadState('load',{timeout:60}); // The promise resolves after 'load' event.
        });
        
    }

    async closePage() {
        await test.step('Closing Application', async () => {
            await page.close();;
        });
    }

    async goBack() {
        await test.step('Navigating to previous page', async () => {
            await page.goBack();
        });
        
    }
}