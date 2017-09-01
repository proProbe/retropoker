module.exports = {
  parser: "babel-eslint",
  plugins: ["eslint-plugin-react"],
  extends: [
    "./configs/eslint/general-rules.js",
    "./configs/eslint/react-rules.js"
  ],
  parserOptions: {
    ecmaFeatures: {
      arrowFunctions: true,
      blockBindings: true,
      classes: true,
      defaultParams: true,
      destructuring: true,
      forOf: true,
      generators: false,
      modules: true,
      objectLiteralComputedProperties: true,
      objectLiteralDuplicateProperties: false,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
      restParams: true,
      spread: true,
      superInFunctions: true,
      templateStrings: true,
      jsx: true
    },
    ecmaVersion: 7
  }
};
