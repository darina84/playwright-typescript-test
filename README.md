# TypeScript + Playwright UI Tests Of Demo App

This repository contains UI test automation for a demo application using TypeScript and Playwright.

## Overview

The project demonstrates how to build maintainable browser tests with:

- Playwright
- TypeScript
- Page Object Model (POM)
- Reusable widgets and page objects
- Browser automation for the OrangeHRM demo app

## Tech Stack

- TypeScript
- Playwright Test
- Node.js

## Project Structure

```bash
playwright-typescript-test/
├── tests/
│   ├── example.spec.ts
│   └── utils/
│       └── pages/
│           ├── admin.ts
│           ├── app.ts
│           ├── base-page.ts
│           ├── login.ts
│           ├── pim.ts
│           └── widgets/
│               ├── admin/
│               │   ├── add-user-form.ts
│               │   ├── admin-records-table.ts
│               │   └── system-users-filter.ts
│               └── pim/
│                   ├── add-employee-form.ts
│                   └── system-users-filter.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── package-lock.json
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the tests:

```bash
npx playwright test
```

3. Run a specific browser test:

```bash
npx playwright test tests/example.spec.ts --project=chromium --headed
```

## Demo App Under Test

This project targets the OrangeHRM demo application:

https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Notes

This is intended as a learning and demonstration repository for TypeScript + Playwright UI automation patterns.
