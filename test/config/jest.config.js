export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "..",
  testEnvironment: "node",
  testRegex: "app.test.js",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  preset: "ts-jest",
  verbose: true,
  forceExit: true,
  clearMocks: true,
};
