module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "hotfix",
      ],
    ],
    "subject-case": [
      2,
      "always",
      [
        "lower-case",
        "upper-case",
        "camel-case",
        "kebab-case",
        "pascal-case",
        "sentence-case",
        "start-case",
      ],
    ],
  },
};
