# QA Automation Framework

A comprehensive framework for API and performance testing using Playwright and K6.

## Project Structure

```
├── automation-tests/     # Playwright API tests
│   ├── api/             # API test implementations
│   └── fixtures/        # Test fixtures and helpers
├── stress-tests/        # K6 performance tests
│   ├── scenarios/       # Test scenarios
│   └── utils/          # K6-specific utilities
├── config/             # Environment configurations
│   ├── environments/   # Environment-specific configs
│   └── types.ts       # TypeScript interfaces
├── shared/            # Shared utilities and helpers
├── test-data/         # Test data files
├── utils/             # Common utilities
└── fixtures/          # Shared test fixtures
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

## Running Tests

### API Tests (Playwright)

```bash
# Run in specific environment
npm run test:api:dev
npm run test:api:stg
npm run test:api:prod

# Run by tag
npm run test:smoke
npm run test:regression
```

### Stress Tests (K6)

```bash
# Run in specific environment
npm run test:stress:dev
npm run test:stress:stg
npm run test:stress:prod
```

## CI/CD Integration

The framework supports CI/CD pipelines with:
- Environment-specific configurations
- Parallel test execution
- Test reporting with Allure
- Conditional test execution based on tags