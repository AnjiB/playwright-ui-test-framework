# playwright-ui-test-framework

### Tech Stack
* Node 21.5.0
* NPM 10.2.4
* Playwright 1.46.1
* Allure Playwright 3.0.0-beta.10
* Allure Command Line: 2.30.0


### Test Automation Architecture:
![Blank document](https://github.com/user-attachments/assets/aedabf50-5f86-464b-be9f-6b6bed8ece4a)


### The framework and tests to automate Horizon UI consists of several layers.

* **Test Layer**: Contains tests
* **Component Layer**: Contains all the end user functional behavior methods per component.
* **Component Object Layer**: Contains locators per component.
* **Actions Layer**: Contains UI Actions, Page related functionalities
* **Utils Layer**: Contains Utils like Logger. Configs, Date etc
* **Core Layer**:  Core layer contains of Playwright and Allure & other libraries

### Generic flow of a test: 
* A test mainly interacts with PageUtils & Components.
* Components consist of all business / functional methods.
* Components internally get locators from Component Object classes and interact with UIActions & other Utils to perform actions on each individual html elements like button, checkbox, etc.,
* Playwright test runner helps us with testing by providing APIs to run the tests sequentially or in parallel or to run Repeated tests and parameterized tests.

## 📁 Project Structure

The tests follow a modular and maintainable structure:

```
|-- .github
|     |-- workflows
|          |-- playwright.yml
|          
|-- components
|     |-- calendar_component.js
|     |-- chakra_stock_left_inks_component.js   
|     |-- header_component.js
|     |-- table_component.js     
|-- component_objects
|     |-- calendar_comp_obj.js
|     |-- chakra_stock_left_inks_comp_obj.js
|     |-- header_comp_obj.js
|     |-- users
|--  configuration
|     |-- env_configs.js
|--  constants
|     |-- constants.js
|--  framework
|     |-- accessibility
|          |-- accessbility_util.js
|     |-- actions
|          |-- ui_actions.js
|     |-- logger
|          |-- custom_logger.js
|     |-- page
|          |-- page_util.js
|     |-- utils
|          |-- wait_util.js
|          |-- date_util.js
|--  testdata  
|     |-- left_nav_links.json
|-- tests
|     |-- accessibility.axe.spec.js
|     |-- calendar.spec.js
|     |-- chakra.tables.spec.js
|     |-- cheader.search.spec.js
|     |-- leftpanel.links.spec.js
|     |-- rtl.visual.spec.js
|-- visual_testing
|     |-- __screenshots__
|-- .gitignore
|-- .gitlab-ci.yml
|-- package.json
|-- playwright.config.js
|-- Dockerfile.playwright
```

## How to run Tests:
### From VSCode
* Import the test project into any IDE like Visual Studio to run the tests on IDE. Note: IDE must have plugin "Playwright Test". Please follow the instructions for VS Code here: https://playwright.dev/docs/getting-started-vscode
### Running tests from Terminal
* Run all the tests : ```npx playwright test```
* Run the tests only against chrome: ```npm run test:chrome```
* We can also run the test using tags. Ex: ```npm run test:chrome — – grep @accessibility```
* Run the tests only against projects configured in playwright configuration: ```npx playwright test –project=firefox```

**Note:** Read more instructions here https://playwright.dev/docs/running-tests to know how to run the tests.

We also have support to pass playwright base url from environment variable as below.

```PLAYWRIGHT_BASE_URL=https://horizon-ui.com/horizon-ui-chakra/admin/default#/admin/default npm run test:chrome -- --grep=@search```

