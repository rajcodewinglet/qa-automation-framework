# API Automation Test Framework

A comprehensive framework for API test automation using Playwright and TypeScript.

## Features

- Environment-specific configuration (dev, stg, prod)
- Modular request handlers for multiple products
- Data-driven testing approach
- Centralized HTTP client with request/response logging
- Automatic token management and authentication
- Test tagging for flexible test execution
- Allure reporting integration

## Project Structure

```
automation-tests/
├── configs/             # Environment-specific configurations
├── environments/        # Environment management
├── tests/               # Test files organized by product
├── requests/            # API request handlers
├── data/                # Test data for data-driven testing
├── utils/               # Utility functions and helpers
├── fixtures/            # Playwright fixtures for setup/teardown
├── playwright.config.ts # Playwright configuration
├── package.json         # Project dependencies
└── README.md            # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure the environment variables in `.env` file

### Running Tests

Run all tests:

```bash
npm test
```

Run tests in a specific environment:

```bash
npm run test:dev   # Development environment
npm run test:stg   # Staging environment
npm run test:prod  # Production environment
```

Run only tests with specific tags:

```bash
npm run test:smoke       # Run smoke tests
npm run test:regression  # Run regression tests
```

Run tests for a specific product:

```bash
npm run test:eds              # Run EDS tests
npm run test:ai-ems           # Run AI-EMS tests
npm run test:document-processing  # Run Document Processing tests
npm run test:var              # Run VAR tests
npm run test:super-admin      # Run Super Admin tests
npm run test:workforce-agent  # Run Workforce Agent tests
```

### Generating Reports

Generate and open Allure reports:

```bash
npm run report
```

## Framework Components

### Environment Configuration

The framework supports multiple environments (dev, stg, prod) with easy switching via environment variables. Configuration can be customized in the `configs/` directory.

### API Client

The centralized API client (`utils/apiClient.ts`) handles all HTTP requests, managing authentication, logging, and error handling.

### Request Handlers

Request handlers in the `requests/` directory provide typed interfaces for API endpoints, organized by product and feature.

### Test Data

Data files in the `data/` directory provide test data for data-driven testing.

### Test Fixtures

Fixtures in the `fixtures/` directory handle common setup and teardown operations, such as authentication.

### Test Tags

Tests can be tagged with `@smoke`, `@regression`, etc. for selective execution.

## Extending the Framework

### Adding a New Product

1. Create a new product configuration in `configs/types.ts` and update each environment config
2. Create a new product directory in `tests/` and `requests/`
3. Create request handlers and test files for the new product

### Adding a New Environment

1. Create a new configuration file in `configs/`
2. Update the `environments/env.ts` file to load the new config
3. Add a new npm script in `package.json` to run tests in the new environment

## Best Practices

- Use descriptive test names that explain what is being tested
- Add tags to categorize tests (`@smoke`, `@regression`, etc.)
- Keep tests independent and isolated
- Use data-driven testing for similar test cases
- Validate all important aspects of API responses
- Handle errors gracefully in tests
- Use appropriate assertions for different scenarios