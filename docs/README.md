# Documentation

## Introduction

The application is a full-stack web application with a frontend and backend, allowing a user to search and filter character from Rick and Morty. These characters can be rated by users, and the users can be sorted by their number of ratings.

The characters are fetched from the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql/), and are populated in our own MySQL database. For implementation details on how this is done, please see the scripts in the [`db` directory](/backend/db).

The frontend is a single-page application built with React. The backend is a GraphQL server built with Express and [`express-graphql`](https://graphql.org/graphql-js/running-an-express-graphql-server/), and is connected to a MySQL database using [Prisma](https://www.prisma.io/).

## Content and functionality

### Search functionality

As a user, you can search for character by name. The search is case-insensitive, and will return all characters whose name contains the search term.

In `backend`, this is done in the `characters` query resolver (see [`backend/src/resolvers/query.ts`](/backend/src/resolvers/query.ts)). Filtering by name is part of the `options` that are passed to the `.findMany(...)` Prisma query.

In `frontend`, this is a simple text input field. In order to not send an unnecessary amount of requests to the backend, the value is [debounced using Mantine's implementation](https://mantine.dev/hooks/use-debounced-value/). For implementation details, see the [`useGetCharacters`](/frontend/src/hooks/characters/useGetCharacters.ts) hook.

### Pagination

The results for the characters in the dashboard and the users in the leaderboard are paginated.

In `backend`, this is achieved using the `take` and `skip` options in the `.findMany(...)` Prisma query. For more information on how this works, see the [Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-client/pagination).

In `frontend`, this is handled by a simple `useState` for the `page`. This integrates with Mantine's pre-built pagination component, which is used in the [`DashboardView`](/frontend/src/views/DashboardView.tsx) and [`LeaderboardView`](/frontend/src/views/LeaderboardView.tsx) views.

Because we use Apollo GraphQL client, the already fetched data is cached. This ensures a great user experience when navigating between pages, as no data that has already been fetched must be fetched again. The Apollo client and cache is created in [`ApolloProvider`](/frontend/src/providers/ApolloProvider.tsx).

### Details about each character

When clicking **More information** about a character in the dashboard, the user is taken to a page with more information about the character. This page is identified by the character's ID. See the [`CharacterView`](/frontend/src/views/characters/CharacterView.tsx) view for more information about this view.

### Filtering characters

The characters can be filtered on various attributes.

In `frontend`, the filter is set using Apollo state management's reactive variables. For details on how this is implemented, see the [`useGetCharacters`](/frontend/src/hooks/characters/useGetCharacters.ts) hook.

In `backend`, this is done in the `characters` query resolver (see [`backend/src/resolvers/query.ts`](/backend/src/resolvers/query.ts)). The compund filtering is the `options` object that is passed to the `.findMany(...)` Prisma query. For more information on how this works, see the [Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting).

**It is important to note that** this filtering is applied to the entire dataset, and is then paginated and delivered to the client. In other words, the client simply displays the filtered data it receives from the server.

### Sorting users

The users can be sorted by their number of ratings, either in ascending or descending order.

In `frontend`, the sorting is set using Apollo state management's reactive variables. For details on how this is implemented, see the [`useGetUsers`](/frontend/src/hooks/users/useGetUsers.ts) hook.

**It is important to note that** this sorting is applied to the entire dataset, and is then paginated and delivered to the client. In other words, the client simply displays the sorted data it receives from the server.

### Storing user ratings about characters

When a user rates a character, the rating is stored in the database. The user can only rate a character once, and can update their rating at any time.

This is presented when rating in character in the [`CharacterView`](/frontend/src/views/characters/CharacterView.tsx) view.

### Universal design, web accessibility and sustainable development

In order to keep this documentation clean and concise, we have moved the documentation for this topic to its own file. [**Click here to read more about universal design, web accessibility and sustainable development**](/docs/ACCESSIBILITY.md).

### Application design

The application design is simplistic and minimalistic. The application is built with Mantine, which is a React UI library that is designed to be accessible, responsive and easy to use. As an example, when filtering a character, the user selects a series of filter parameters in a [`FilterDrawer.tsx`](/frontend/src/components/filter/FilterDrawer.tsx). This is an easy to use and user-friendly component.

When fetching characters, the list of characters are displayed in a simple and easy to understand list format. The user can learn more about each character by clicking a button with **More information** that stands out, making the UI easy to use.

### Database and the virtual machine, with seeded data

A MySQL database has been installed on the virtual machine (VM) hosted by NTNU, and connected using the Prisma ORM. We have consciously not added the database connection string to `.gitignore`, as this is a public repository. This is to make it easier for peer reviewers to test the application.

The process of populating the database is split into three parts, and can all be executed using `npm run db:seed` in the `backend` directory. There should be no need for a peer reviewer to do this, but it is possible.

First, we check if the characters from the Rick and Morty API are already in the database. If not, we fetch them. For implementation details, see [`db/download.ts`](/backend/db/download.ts). Then the characters are populated into the database. For implementation details, see [`db/populate.ts`](/backend/db/populate.ts). Finally, we seed the database with users and ratings. For implementation details, see [`db/seed.ts`](/backend/db/seed.ts).

This ensures that the database is populated with the same data every time the application is seeded.

## Technology and tech stack

### React

The user interface is implemented using React with TypeScript. For more information, see the [`frontend` documentation](/frontend/README.md). The application is initialized using `create-react-app`, and is implementated using TypeScript.

#### Important to note: Validating a user's JWT token in the frontend

In the second assignment, users could be authenticated directly towards GitLab's authentication server. In this assignment, however, we implemented our own username/password authentication using JSON Web Tokens.

JWT tokens can be used to verify the validity of a user session by encoding user data with a secret variable on the server. This token can then be validated on the frontend using the same secret. **This ensures that the user session is valid and has not been tampered with**.

Additionally, to comply with current security standards, the provided passwords are hashed using `bcrypt` with sufficient rounds of salting. This ensures that any breaches of the database would render the passwords virtually useless and non-decryptable.

In this particular project, we had to use `create-react-app` to initialize the project. As of late 2020 [[1]], `create-react-app` officially started using Webpack 5 as the default Webpack version. This caused some breaking changes, as Webpack version 4 and up no longer includes core `node.js` modules, such as `stream`, `crypto` or `url`, all of which are used by both the `bcrypt` and `jsonwebtoken` libraries.

The solution for this problem is to add polyfills for the `node.js` core modules [[2]], which can be done by altering the `webpack.config.js` file. This file, however, is located inside the `node_modules` directory when using `create-react-app`, and the configurations would therefore be overwritten on every subsequent `npm install`.

Therefore, we utilize `react-app-rewired`, which essentially allows the injection of custom Webpack configuration files, **before running the application with `react-scripts`**. This way, we are able to use the core `node.js` modules that are required by `bcrypt` and `jsonwebtoken`, **creating a secure, industry standard user authentication system**.

[1]: https://github.com/facebook/create-react-app/issues/9994
[2]: https://github.com/ecadlabs/taquito/issues/1281

**In summary, the project is initialized using `create-react-app`, and the Webpack configuration is altered using `react-app-rewired` to allow the use of `bcrypt` and `jsonwebtoken`**.

### Local state management

Local state management is handled by Apollo, specifically by the use of [Reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/). In particular, we use reactive variables for the following:

- Filtering characters. For implementation details, see the [`useGetCharacters`](/frontend/src/hooks/characters/useGetCharacters.ts) hook and [`state/dashboard.ts`](/frontend/src/state/dashboard.ts).

- Sorting users. For implementation details, see the [`useGetUsers`](/frontend/src/hooks/users/useGetUsers.ts) hook and [`state/leaderboard.ts`](/frontend/src/state/leaderboard.ts).

Note that this is not to be confused with Apollo's [client-side cache](https://www.apollographql.com/docs/react/caching/cache-configuration/). The client-side cache is used to store data that has already been fetched from the server, and is used to ensure a great user experience when navigating between pages. The reactive variables are used to store data that is not fetched from the server, but is instead set by the user.

### GraphQL backend

The backend is an Express web server with a GraphQL API. The resolvers interact with the database using Prisma.

To ensure type safety in out resolvers, we use [GraphQL Code Generator](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers). This generates TypeScript types for the GraphQL schema, and TypeScript resolvers for the GraphQL queries and mutations. These types are generated using `npm run gen:types` in the `backend` directory.

For more information, see the [`backend` documentation](/backend/README.md).

### UI components

We have primarily used [Mantine](https://mantine.dev/) for our UI components. Additionally, Mantine comes with functionality for a color theme and useful hooks for form validation.

Mantine is set up in our [`StyleProvider.tsx`](/frontend/src/providers/StyleProvider.tsx) component, which is rendered in the [`App.tsx`](/frontend/src/App.tsx) component.

In order to clean up the code, we have created our own custom components, which are located in [`frontend/src/components`](/frontend/src/components). These components are used to wrap Mantine components, and to add additional functionality where needed. For an example, see [`FilterDrawer.tsx`](/frontend/src/components/filter/FilterDrawer.tsx).

## Testing and documentation

### Types of testing

The `frontend` has been tested using unit tests, snapshot tests, component tests and end-to-end (E2E) tests.

For the unit tests, [Jest](https://jestjs.io/) was used. We test that the schema validation to be used in our forms is working as intended, in addition to the rating schema validation. See the tests in [`__tests__/schemas/forms.test.ts`](/frontend/src/__tests__/schemas/forms.test.ts) and [`__tests__/schemas/rating.test.ts`](/frontend/src/__tests__/schemas/rating.test.ts).

For the snapshot tests and component tests, [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) was used. These tests are located in [`frontend/src/__tests__`](/frontend/src/__tests__).

For the E2E tests, [Cypress](https://www.cypress.io/) was used. These tests are located in [`frontend/cypress`](/frontend/cypress). We have written some helper functions for the Cypress tests, which are located in [`frontend/cypress/support/commands`](/frontend/cypress/support/commands.ts).

To enforce that these tests are _actually_ run, we have set up a GitLab continuous integration pipeline. For implementation details, see [`.gitlab-ci.yml`](/.gitlab-ci.yml).

### Commenting code

In addition to this documentation, we have written an overview of the [`frontend` documentation](/frontend/README.md) and the [`backend` documentation](/backend/README.md). This documentation is intended to be read by the peer reviewers, and offer a bird-eye view of each directory.

Furthermore, both the `backend` and `frontend` have been extensively commented. This is to ensure that the code is easy to understand, and to make it easier for future developers to work on the project.
