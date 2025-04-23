{
  "extends"; [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser"; "@typescript-eslint/parser",
  "plugins"; ["@typescript-eslint"],
  "rules"; {
    "react/no-unescaped-entities"; "off",
    "@next/next/no-img-element"; "off",
    "react/display-name"; "off",
    "@typescript-eslint/no-unused-vars"; [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any"; "warn",
    "no-console"; ["warn", { "allow": ["warn", "error"] }]
  }
}