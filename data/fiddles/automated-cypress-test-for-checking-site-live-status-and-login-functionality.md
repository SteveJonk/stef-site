---
title: Checking Site Live Status and Login
date: '2023-08-03'
tags: ['cypress', 'testing', 'e2e', 'ci/cd']
draft: false
summary: Automated Cypress Test for Checking Site Live Status and Login Functionality
images: []
layout: PostLayout
canonicalUrl:
repoUrl: https://github.com/SteveJonk/trockenblumen-login-test
---

I used Cypress to create a simple test to check if a website is live and if customers can log in successfully. Cypress is a powerful end-to-end testing framework that allows us to perform automated tests on web applications.

## Test Scenario

For this test, I selected a specific page on the website where customers can log in. I wanted to ensure that the login functionality is working as expected and that the website is still live and accessible.

## Cypress Test Implementation

To create the test, I used the following JavaScript code snippet within a Cypress test file:

```jsx
describe('Login in My Account', () => {
  it('Logs in', () => {
    // Navigate to the login page
    cy.visit('/mein-account/edit-account/')

    // Enter login credentials
    cy.get('#username').type('SteveTest', { force: true })
    cy.get('#password').type('Haarlem01?', { force: true })

    // Click the login button
    cy.get(':nth-child(3) > .woocommerce-button').click({ force: true })

    // Verify successful login
    cy.contains('Account Details').should('be.visible')
  })
})
```

## Explanation of the Test

1. `describe('Login in My Account')`: This block of code sets up the test suite with a description of what the test will cover, which is logging into the "My Account" section.
2. `it('Logs in')`: This block of code defines the actual test case, stating that the test will verify the login functionality.
3. `cy.visit('/mein-account/edit-account/')`: This line instructs Cypress to visit the specified URL, which is the login page on the website.
4. `cy.get('#username').type('SteveTest', { force: true })`: Using `cy.get()`, we target the username input field and use `.type()` to enter the username 'SteveTest'. The `{ force: true }` option is used to override any element visibility issues that might prevent the typing.
5. `cy.get('#password').type('Haarlem01?', { force: true })`: Similarly, we target the password input field and use `.type()` to enter the password 'Haarlem01?'.
6. `cy.get(':nth-child(3) > .woocommerce-button').click({ force: true })`: This line finds and clicks the login button. Again, we use `{ force: true }` to bypass any potential visibility issues.
7. `cy.contains('Account Details').should('be.visible')`: Finally, we use `cy.contains()` to check if the text "Account Details" is visible on the page, indicating a successful login.

## Running the Test

To ensure continuous monitoring of the website's login functionality and its availability, I implemented a GitHub Action to run the Cypress test periodically and write the results to the Cypress Dashboard.

The GitHub Action yml file is as follows:

```yaml
name: Trockenblumen Login Cypress Test

on:
  push:
  schedule:
    # Runs "at minute 55 past every hour" (see <https://crontab.guru>)
    - cron: '0 0,4,8,12,16,20 * * *'

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      # Install NPM dependencies, cache them correctly
      # and run all Cypress tests
      - name: Cypress run
        uses: cypress-io/github-action@v4
        with:
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CY_DASHBOARD }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This action is triggered on every push to the repository and scheduled to run every 4 hours. The `cypress-run` job executes on an Ubuntu environment. First, it checks out the latest code from the repository using `actions/checkout@v2`. Then, it uses the official `cypress-io/github-action@v4` to install the NPM dependencies, cache them efficiently, and run the Cypress tests.

For test reporting and monitoring, the `record: true` option is set, allowing the test results to be sent to the Cypress Dashboard.

By implementing this GitHub Action, I have established an automated process that periodically checks the website's login functionality and its availability. This provides me with valuable insights into the website's health and ensures that our customers can continue to have a seamless experience while using the platform.

Now, with the combination of Cypress tests and the GitHub Action, I can rest assured that the website is always up and running, delivering a reliable experience to our users.

Happy testing!
