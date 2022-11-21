# Team 11: Project 4

## Description

This project is full-stack web application about Rick and Morty characters.

As a user, you can search and filter characters. As a logged-in user,
you can rate a given character. You can also see a leaderboard of all
users' number of ratings, sorted in ascending or descending order.

## Important to note

In order to not affect the backend and database from project 3, the group has copied the backend folder from project 3 and created a new database for project 4. **The only changes in the backend from project 3 to project 4 include changing the port it runs on and communicating with a new database, in order to not conflict with project 3**.

Hence, major changes between project 3 and project 4 is remaking the frontend using Vue.

## Live demo

Please use [this link](http://it2810-11.idi.ntnu.no/project4) to visit a live demo of the website.

## Developer Information

Developed by Sebastian Sole, Julian Grande, Victoria Kallerud and Magnus Rødseth.

## Documentation

Please read the [`docs` documentation](/docs/README.md).

## Tech stack and libraries

### `frontend`

- Vue
- TypeScript
- Element Plus, a library with UI components
- Tailwind, for easier CSS styling
- VueUse, a library with useful hooks
- VeeValidate, for form validation
- VueRouter, for routing
- Yup Schema Validation
- Apollo GraphQL client
- Pinia global state management
- JSON Web Token, for handling the user session
- Vitest, for unit tests, component tests and snapshot tests
- Cypress, for end-to-end testing

### `backend`

- Express, a web server
- TypeScript
- GraphQL
- JSON Web Token, for handling the user session
- Prisma Client, a client for interacting with the PostgreSQL database
- Rollup, for transpiling and bundling the application to JavaScript

### Database

- MySQL, a relational database running on the virtual machine hosted by NTNU

## Running the application

### Running `frontend`

```sh
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm i

# Start application
npm start
```

### Running `backend`

```sh
# Navigate to the backend directory
cd backend

# Install dependencies
npm i

# Start application in development mode
npm run dev

# or

# Compile and start application in production mode
npm start
```

### Connecting to the database

Ensure you have a `.env` file located in the `backend/.env` directory with the following contents:

```sh
PORT=9090
DATABASE_URL="mysql://team-11:password@it2810-11.idi.ntnu.no:3306/project4"
```

The `.env` file is not part of the `.gitignore`, as it is not sensitive information in this project, and other students require access to the database in order to run it locally.

Please see [`backend/package.json`](/backend/package.json) for more information of the available scripts regarding the database.

## Testing the application

This part assumes that all dependencies are installed. The end-to-end tests assume that the frontend is running **in production mode** (`PORT=5173`), as it attempts to connect to it before running the end-to-end tests.

### Testing `frontend`

```sh
# Navigate to the frontend directory
cd frontend

# Run unit tests and component tests
npm run test:unit

# Run E2E tests in browser
npm run test:e2e

# or

# Run E2E tests headless
npm run test:e2e:ci
```
