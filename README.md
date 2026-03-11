# Playwright UI Automation Framework

This is a **UI automation framework** using **Playwright** and **TypeScript**, built with Page Object Model and centralized test data.  
It demonstrates **professional QA automation practices** for a portfolio.

---

## 🧪 What’s implemented so far

- **Login tests** (positive and negative scenarios) against [Sauce Demo](https://www.saucedemo.com)
- **Page Object Model** applied (`pages/login.page.ts`)
- **Test data management** (`fixtures/users.ts`)
- Tests organized in `tests/e2e/`
- Basic framework structure ready for future expansions

---

## 🗂 Project Structure

```text
playwright-ui-automation-framework
│
├── pages
│   └── login.page.ts
├── tests
│   └── e2e
│       └── login.spec.ts
├── fixtures
│   └── users.ts
├── utils
├── playwright.config.ts
└── package.json
```

---

## 🚀 How to run the tests

Install dependencies:

```text
npm install
npx playwright install
```

Run tests headless:

```text
npx playwright test
```

Run tests with browser visible:

```text
npx playwright test --headed
```

Generate HTML report:

```text
npx playwright test --reporter=html
npx playwright show-report
```