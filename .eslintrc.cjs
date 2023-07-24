module.exports = {
    root: true,
    extends: [
      // "airbnb",
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/errors"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-unused-vars": 1,
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-var-requires": 1,
        "@typescript-eslint/no-this-alias": 1,
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "no-console": 0,
        "no-useless-return": 0,
        "max-len": [1, 150],
        "no-use-before-define": 0,
        "no-unused-expressions": 0,
        "func-names": 0
    },
};
