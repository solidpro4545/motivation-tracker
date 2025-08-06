🧠 Motivation Tracker
A simple motivation tracker built with React + TypeScript, enhanced with Cypress for E2E testing and Jest for unit testing.

This project was bootstrapped with Create React App.

🛠 Tech Stack
React + TypeScript

Cypress (E2E Testing)

Jest + React Testing Library (Unit Testing)

React Router

Custom Cypress Commands (with TypeScript types)

🚀 Scripts
Run these in your project root:

npm start
Starts the app in development mode.
Open http://localhost:3000 to view it.

npm test
Runs unit tests using Jest in interactive watch mode.

npx cypress open
Launches the Cypress Test Runner for E2E tests.

npx cypress run
Runs Cypress tests in headless mode (great for CI/CD).

npm run build
Builds the app for production.

🧪 Testing
✅ Unit Testing with Jest
bash
Copy
Edit
npm test
Tests are colocated with components and use React Testing Library syntax.

✅ End-to-End Testing with Cypress
bash
Copy
Edit
npx cypress open
Cypress specs are located in cypress/e2e/. Example test structure is already included.

🧾 Custom Cypress Commands
Custom Cypress commands are declared in cypress/support/commands.ts and typed in support/index.d.ts.

Example:

ts
Copy
Edit
// cypress/support/commands.ts
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
});
ts
Copy
Edit
// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
  }
}
🧠 Learn More
React Documentation

Cypress Documentation

Jest Documentation

Create React App Guide

