# playwright-reto-30-dias 🎭

> A project focused on mastering Playwright through a 30-day challenge with practical examples and best practices.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)

## 📋 Description

This project is part of a 30-day challenge focused on mastering **Playwright**, a modern library for browser automation and end-to-end (E2E) testing. It includes practical examples, automated tests, and best practices for test automation.

## 🚀 Features

- ✅ Automated end-to-end (E2E) testing
- ✅ Support for multiple browsers (Chromium, Firefox, WebKit)
- ✅ Written in TypeScript for type safety
- ✅ Modular and scalable configuration
- ✅ Practical automation examples
- ✅ Page Object Model pattern implementation

## 📦 Requirements

- **Node.js** >= 16.x
- **npm** or **yarn**

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/edwincasallas22/playwright-reto-30-dias.git
cd playwright-reto-30-dias

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🎯 Usage

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests in UI mode

```bash
npm run test:ui
```

### Run tests with HTML report

```bash
npm run test:report
```

## 📁 Project Structure

```
playwright-reto-30-dias/
├── tests/                  # Test files
│   ├── example.spec.ts    # Example tests
│   └── ...
├── pages/                 # Page Object Model (optional)
│   ├── basePage.ts
│   └── ...
├── utils/                 # Utilities and helpers
│   └── ...
├── playwright.config.ts   # Playwright configuration
├── package.json
└── README.md
```

## 🔧 Configuration

The project uses `playwright.config.ts` for configuration. You can customize:

- Browsers to use
- Test timeouts
- Reports
- Environment variables
- And more...

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
});
```

## 📊 Reports

After running tests, you can view the reports:

```bash
# View HTML report
npx playwright show-report
```

## 🧪 Testing Best Practices

- Use Page Object Model (POM) for maintainability
- Keep selectors localized in page objects
- Use meaningful test descriptions
- Implement proper waits and assertions
- Run tests in parallel when possible
- Use fixtures for common setup/teardown

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

## 👤 Author

**Edwin Casallas**
- GitHub: [@edwincasallas22](https://github.com/edwincasallas22)

## 🔗 Useful Resources

- [Playwright Official Documentation](https://playwright.dev)
- [Playwright Testing Guide](https://playwright.dev/docs/intro)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)

## 🎓 Learning Path (30-Day Challenge)

This repository is structured to progressively learn Playwright over 30 days:

- **Week 1**: Basics and setup
- **Week 2**: Selectors and interactions
- **Week 3**: Advanced testing patterns
- **Week 4**: Real-world applications and CI/CD

---

⭐ If you find this helpful, please leave a star!

For questions or suggestions, feel free to open an issue.
