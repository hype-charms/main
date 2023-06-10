module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off"
  },
  overrides: [
    {
      "files": ["**/*.js"],
      "excludedFiles": "public/scripts/font-awesome.js"
    }
  ]
}