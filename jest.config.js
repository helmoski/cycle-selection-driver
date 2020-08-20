module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
  ],
  coveragePathIgnorePatterns: [
    '.*/index.ts',
    '/__tests__/util/',
  ],
  coverageReporters: [
    'text',
    'html',
    'lcov',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      lines: 100,
      functions: 100,
      statements: 100,
    }
  },
  preset: 'ts-jest',
  roots: [
    'src',
  ],
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*\\.spec\\.ts$',
};
