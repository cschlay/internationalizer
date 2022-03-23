module.exports = {
  // Test Environment
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Mocking Static Assets
  clearMocks: true,
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  // Coverage
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "node_modules/",
    "coverage/",
    "styles/",
    "public/",
    ".stories.tsx",
    ".next/",
    ".storybook/",
    "emptyFn.ts",
    "<rootDir>/tests/",
  ],
  coverageProvider: "v8",
  // Global Settings
  globals: {
    "ts-jest": {
      // NextJs uses "jsx: preserve" doesn't work with "jest"
      tsconfig: "<rootDir>/tests/tsconfig.test.json",
      fetchMock: true,
      tlib: true,
    },
  },
  modulePathIgnorePatterns: ["<rootDir>/cypress/"],
};
