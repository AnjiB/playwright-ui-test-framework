import {test, expect} from '@playwright/test';

export class UIActions {

    constructor(locator, type) {
        this.locator = locator;
        this.type = type;
    }

    async click() {
        await test.step(`Clicking on ${this.type}`,  async () => {
            await this.locator.waitFor();
            await this.locator.click();
        })
    }

    async doubleClick() {
        await test.step(`Clicking on ${this.type}`,  async () => {
            await this.locator.waitFor();
            await this.locator.dblclick();
        })
    }

    async check() {
        await test.step(`Checking the check box`,  async () => {
            await this.locator.waitFor();
            await expect(this.locator).toBeChecked();
            await this.locator.check();
        })
    }

    async uncheck() {
        await test.step(`Unchecking the check box`,  async () => {
            await this.locator.waitFor();
            await this.locator.uncheck();
        })
    }


    async waitTillVisible(waitTime=30) {
        await test.step('Waiting for an element to be visible',  async () => {
            await this.locator.waitFor({
                state: 'visible',
                timeout: waitTime*1000
            })
        })
    }

    async getTextContent() {
        await test.step('Getting text content', async () => {
            await this.locator.waitFor();
           return await  this.locator.textContent();
        })
    }


    async getTextContent() {
        await test.step('Getting text content', async () => {
            await this.locator.waitFor();
           return await  this.locator.textContent();
        })
    }


    async keyPress(key) {
        await test.step('Pressing on key' + key, async () => {
            await this.locator.waitFor();
           return await  this.locator.press(key);
        })
    }


    async scrollIntoView() {
        await test.step('Scrolling to the view of element', async () => {
            await this.locator.waitFor();
           return await  this.locator.scrollIntoViewIfNeeded();
        })
    }


    async fillText(text) {
        await test.step(`Filling the text ${text}`, async () => {
            await this.locator.waitFor();
           return await  this.locator.fill(text);
        })
    }


    async hover() {
        await test.step('Hovering to the element', async () => {
            await this.locator.waitFor();
           return await  this.locator.hover();
        })
    }


    async selectByValue(value) {
            await test.step(`Selecting option by its value ${value}`, async () => {
                await this.locator.waitFor();
            return await  this.locator.selectOption(value);
            })
        }


    async selectByVisibleText(text) {
        await test.step(`Selecting option by its visible text ${text}`, async () => {
            await this.locator.waitFor();
        return await  this.locator.selectOption({label: text});
        })
    }

    async selectByIndex(index) {
        await test.step(`Selecting option by its index at ${index}`, async () => {
            await this.locator.waitFor();
        return await  this.locator.selectOption({index});
        })
    }

    async getAllOptions() {
        await test.step('Get all available options to be selected', async () => {
            await this.locator.waitFor();
        return await  this.locator.locator('option').allTextContents();
        })
    }


    async getAllSelectedOptions() {
        await test.step('Get all available options to be selected', async () => {
            await this.locator.waitFor();
        return await  this.locator.locator("option[selected='selected']").allTextContents();
        })
    }
}