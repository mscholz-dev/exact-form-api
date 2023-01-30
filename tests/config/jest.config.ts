const jestConfig = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "..",
  testEnvironment: "node",
  testRegex: "app.test.js",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  preset: "ts-jest",
  verbose: true,
  clearMocks: true,
  testTimeout: 10_000,
};

export default jestConfig;
