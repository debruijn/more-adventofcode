module.exports = {
    extends: ['@commitlint/cli', '@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',  // feat: implement user profile page
                'fix',  // fix: correct typo in user profile page
                'docs', // docs: add jsdoc to user profile page
                'style', // style: add css to user profile page
                'refactor', // refactor: extract user profile page to component
                'perf', // perf: improve user profile page load time
                'test', // test: add unit test for user profile page
                'build', // build: update webpack config
                'ci',   // ci: add github actions
                'chore',    // chore: update dependencies
                'revert'    // revert: revert changes
            ]
        ],
        'subject-case': [2, 'always', 'sentence-case']
    }
}
// for flexible commit messages
// module.exports = {
//     extends: ['@commitlint/cli', '@commitlint/config-conventional'],
//     rules: {
//         // Disable the type-enum rule
//         'type-enum': [0], // 0 disables the rule

//         // Disable the type-empty rule to allow commits without a type
//         'type-empty': [0], // 0 disables the rule

//         // Disable the subject-case rule
//         'subject-case': [0], // 0 disables the rule

//         // Optionally, disable subject-empty to allow empty subjects
//         'subject-empty': [0], // 0 disables the rule

//         // Disable other rules if needed
//     }
// }