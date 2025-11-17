export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only
        'style',    // Changes that don't affect code meaning (spaces, formatting, etc)
        'refactor', // Code refactoring that neither adds features nor fixes bugs
        'perf',     // Performance improvement
        'test',     // Adding or correcting tests
        'build',    // Changes to build system or external dependencies
        'ci',       // Changes to CI files and scripts
        'chore',    // Other changes that don't modify src or test files
        'revert'    // Reverts a previous commit
      ]
    ],
    'subject-case': [0], // Allow any capitalization in subject
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100]
  }
};
