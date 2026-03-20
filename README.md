# Playwright UI Automation Framework

This is a **comprehensive UI automation framework** using **Playwright** and **TypeScript**, built with Page Object Model, centralized test data, and visual regression testing.

---

## 🧪 What’s implemented

- **Login tests** (positive and negative scenarios) against [Sauce Demo](https://www.saucedemo.com)
- **Cart management tests** (add/remove products, multiple items)
- **Checkout flow tests** (complete purchase, validation, confirmation)
- **Product sorting tests** (price low-to-high, high-to-low)
- **Logout tests** (successful logout flow)
- **Visual regression tests** (screenshot comparisons, intentional failure demo)
- **Page Object Model** applied across all pages (`pages/`)
- **Test data management** (`fixtures/users.ts`)
- **BeforeEach setup** for login across all tests
- Tests organized in `tests/e2e/` and `tests/visuals/`

---

## 🗂 Project Structure

```text
playwright-ui-automation-framework
│
├── pages
│   ├── login.page.ts
│   ├── inventory.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
├── tests
│   ├── e2e
│   │   ├── login.spec.ts
│   │   ├── logout.spec.ts
│   │   ├── cart-multiple-products.spec.ts
│   │   ├── cart-remove-product.spec.ts
│   │   ├── checkout.spec.ts
│   │   ├── checkout-validation.spec.ts
│   │   ├── complete-purchase-flow.spec.ts
│   │   └── product-sorting.spec.ts
│   └── visuals
│       ├── visual-regression.spec.ts
│       └── visual-regression-failing.spec.ts
├── fixtures
│   └── users.ts
├── utils
├── playwright.config.ts
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 How to run the tests

Install dependencies:

```text
npm install
npx playwright install
```

Run all tests headless:

```text
npx playwright test
```

Run tests with browser visible:

```text
npx playwright test --headed
```

Run specific test suites:

```text
# E2E tests only
npx playwright test tests/e2e/

# Visual regression tests only
npx playwright test tests/visuals/

# Update visual baselines
npx playwright test tests/visuals/visual-regression.spec.ts --update-snapshots
```

Generate HTML report:

```text
npx playwright test --reporter=html
npx playwright show-report
```

---

## 👁 Visual Regression Testing

This framework includes visual regression tests using Playwright's screenshot comparison:

- **Baseline screenshots** stored in `tests/visuals/visual-regression.spec.ts-snapshots/`
- **Automatic diff detection** when UI changes
- **Intentional failure demo** to showcase report capabilities
- **1920x1080 viewport** for consistent screenshots across browsers

---

## ⚙ Configuration

- **TypeScript** strict mode enabled
- **Viewport**: 1920x1080 for all browsers
- **Parallel execution** enabled
- **Screenshots on failure** automatically captured
- **Video recording** on failure
- **Trace collection** on failure

---

## 📊 Test Coverage

- **Login flows** (standard user, error handling)
- **Product management** (add to cart, remove from cart)
- **Checkout process** (form validation, completion, confirmation)
- **Product sorting** (price-based sorting)
- **Visual regression** (UI consistency checks)
- **Cross-browser testing** (Chromium, Firefox, WebKit)