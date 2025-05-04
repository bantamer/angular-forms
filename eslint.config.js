const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-plugin-prettier");
const boundaries = require("eslint-plugin-boundaries");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    plugins: {
      prettier,
      boundaries,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      {
        name: "prettier",
        rules: {
          "prettier/prettier": "error",
        },
      },
    ],
    processor: angular.processInlineTemplates,
    settings: {
      "boundaries/elements": [
        { type: "feature", pattern: "app/features/*" },
        { type: "shared", pattern: "app/shared/*" },
        { type: "core", pattern: "app/core/*" },
      ],
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            {
              from: "feature",
              allow: ["shared", "core"],
            },
            {
              from: "shared",
              allow: ["core"],
            },
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*"],
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
);
