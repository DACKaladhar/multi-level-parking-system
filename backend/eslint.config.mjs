import pkg from "eslint";
const { FlatESLint } = pkg;

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        process: true,
        console: true,
      },
    },
    rules: {
      // Enforce semicolons
      semi: ["warn", "always"],

      // Limit lines per function
      "max-lines-per-function": ["error", { max: 173 }],

      // Ensure tab spaces are set to 2
      "indent": ["warn", 2],

      // Require a blank line before new functions
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "function", next: "function" },
      ],

      // Ensure comments have 2 spaces before and 1 space after `//`
      "spaced-comment": ["error", "always", { markers: [], exceptions: [""] }],

      // No trailing spaces
      "no-trailing-spaces": "warn",

      // Require newline at the end of files
      "eol-last": ["warn", "always"],

      // Show warnings for undefined variables
      "no-undef": "error",

      // Disallow unused variables
      "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],

      // Disallow multiple empty lines      
      "no-multiple-empty-lines": ["warn", { max: 2 }],

      // Enforce consistent line breaks inside curly braces
      "object-curly-newline": ["warn", { multiline: true, consistent: true }],

      // Enforce consistent return
      "consistent-return": "warn",

      // Require `const` for variables not reassigned
      "prefer-const": ["error", { destructuring: "all" }],

      // Disallow `var` declarations
      "no-var": "warn",

      // Enforce line breaks after opening and before closing array brackets
      "array-bracket-newline": ["warn", { multiline: true }],

      // Enforce camelCase naming convention
      "camelcase": ["error", { properties: "always" }],

      // Disallow empty block statements
      "no-empty": "warn",

      // Enforce newline between object properties
      "object-property-newline": ["warn", { allowAllPropertiesOnSameLine: false }],
    },
  },
];
