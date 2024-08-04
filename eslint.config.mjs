import hooks from "eslint-plugin-react-hooks";
import refresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier/recommended";
import styleLint from "stylelint-prettier/recommended";
import js from "@eslint/js";
import globals from "globals";

const modules = {
  files: [".ts", ".tsx", ".js", ".jsx"],
  plugins: {
    "react-refresh": refresh,
    "react-hooks": hooks,
    "stylelint-prettier": styleLint,
  },
  languageOptions: {
    globals: globals.browser,
  },
  ignores: ["dist", "*.config.js", "*.config.mjs"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};

export default [modules, js.configs.recommended, prettier];
