# Documentation

## Important to note

The focus from project 3 to project 4 was rewriting the frontend from React to Vue. Hence, this documentation focuses on the main differences between developing a frontend application in Vue versus React. **Because of this focus, it is assumed that the reader is familiar with the requirements from project 3, and we will therefore not focus on this. As an extension, there is far less focus on the backend codebase in this documentation, as this was was already thoroughly documented in project 3**.

**Note that the only changes in the backend from project 3 to project 4 include changing the port it runs on and communicating with a new database, in order to not conflict with project 3**.

## Introduction

The application is a full-stack web application with a frontend and backend, allowing a user to search and filter character from Rick and Morty. These characters can be rated by users, and the users can be sorted by their number of ratings.

The characters are fetched from the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql/), and are populated in our own MySQL database. For implementation details on how this is done, please see the scripts in the [`db` directory](/backend/db).

The frontend is a single-page application built with Vue. The backend is a GraphQL server built with Express and [`express-graphql`](https://graphql.org/graphql-js/running-an-express-graphql-server/), and is connected to a MySQL database using [Prisma](https://www.prisma.io/).

## Content and functionality

### Requirements

The content and functionality in project 4 fulfills the same requirements defined in project 3:

- **A user can search for a character by name**. To see the functionality, inspect [`DashboardView`](/frontend/src/views/DashboardView.vue).
- **A user gets paginated results of characters**. To see the functionality, inspect [`DashboardView`](/frontend/src/views/DashboardView.vue) or [`LeaderboardView`](/frontend/src/views/LeaderboardView.vue).
- **A user can get details about a given character**. To see the functionality, inspect [`CharacterView`](/frontend/src/views/characters/CharacterView.vue).
- **A user can filter characters based on various attributes**. To see the functionality, inspect [`DashboardView`](/frontend/src/views/DashboardView.vue).
- **A user can sort users in ascending or descending order based on the number of ratings they have**. To see the functionality, inspect [`LeaderboardView`](/frontend/src/views/LeaderboardView.vue).
- **A user can rate a character**. To see the functionality, inspect [`CharacterView`](/frontend/src/views/characters/CharacterView.vue).

The documentation does not go into further detail on these requirements, as they have been elaborated upon in project 3.

## Technology and tech stack

### React versus Vue

Project 3 was implemented using React with TypeScript, initialized using `create-react-app`.

In project 4, the frontend is implemented using Vue with TypeScript. For more information, see the [`frontend` documentation](/frontend/README.md). The application is initialized using `vite`, as this is the preferred build tool for Vue.

Note that the frontend is implemented using [Vue 3 and the composition API](https://vuejs.org/guide/extras/composition-api-faq.html), as opposed to [Vue using the options API](https://vuejs.org/guide/introduction.html#api-styles). This is because the composition API is the preferred way of writing Vue code, and is the future of Vue. The composition API is also used in the [official Vue documentation](https://vuejs.org/guide/quick-start.html#creating-a-vue-application). In general, the composition API leans more to a procedural style of programming, as opposed to the options API, which leans more to an object-oriented style of programming.

#### `useState` versus `ref`

In Vue, the `ref` function is used to store state in a component. This function returns a reactive object, which can be used to store state. This object can be updated using the `value` property, and will trigger a re-render of the component. This is similar to the `useState` hook in React, which returns a state variable and a function to update the state variable.

For an example, see the [`DashboardView`](/frontend/src/views/DashboardView.vue) view.

#### `useEffect` versus `watch`

In Vue, the `watch` function is used to watch for changes in a reactive object. This function takes a reactive object as its first argument, and a callback function as its second argument. The callback function is called whenever the reactive object is updated. This is similar to the `useEffect` hook in React, which takes a callback function as its first argument, and an array of dependencies as its second argument. The callback function is called whenever one of the dependencies is updated.

For an example, see the implementation logic in the [`useGetCharacters` hook](/frontend/src/hooks/characters//useGetCharacters.ts).

#### Emits in Vue

In Vue, the `emit` function is used to emit events from a component. This function takes an event name as its first argument, and an optional payload as its second argument. The event name is used to listen for the event in the parent component.

For an example, see the [`defineEmits` function in the `FilterDrawer`](/frontend/src/components/characters/FilterDrawer.vue) component.

#### Markup, styles and scripts

In Vue, markup, styles and scripts are defined in a single file component. This file is a `.vue` file, and contains the markup in the `<template>` tag, the styles in the `<style>` tag, and the script logic in the `<script>` tag. In React, markup, style and logic may be defined in one file or in separate files.

Note that by using Tailwind in this project, the styling is inlined in the markup, and is not defined in the `<style>` tag. This is the group's personal preference, as it puts markup and style closer together, and makes it easier to see how the markup is styled.

#### Slots versus props

In Vue, the `slot` element is used to define a placeholder for markup in a component. This markup can be defined in the parent component, and will be rendered in the slot. This is similar to the `children` prop in React, which is used to define the markup that should be rendered in a component.

#### The group's summary of the differences

The group's evaluation of the different developer experiences is as follows:

React is a more well-known and utilised JavaScript library than Vue is. This means that when it comes to IDEs, plugins, language support and component libraries, React still has better coverage than Vue. The team behind Vue 3, however, has put a lot of effort into making the development experience as pleasant as possible. The group acknowledges that the structure of a Vue project, and the way components are created in Vue make more sense from a development point of view.

There are some places where React excels, for example when it comes to the `useState` vs the `ref` hooks. It feels more logical to construct a hook like in React: `const [value, setValue] = useState()`, rather than Vue's approach `const value = ref()`. The state implemented inside the `ref` is not accessible by default, and one therefore has to access the value via `value.value`. This, however, is only the case when accessing the `value` attribute in the `<script>` section of the component. When accessing `value` inside `<template>`, the value of the variable is deconstructed by default. This means that `value` can be accessed simply via `{{ value }}` instead of `{{ value.value }}`.

Other than the above-mentioned points, the group is generally happy with both Vue and React, and would be comfortable developing future applications in any one of them.

### Local state management

In project 3, local state management was handled using Apollo, specifically by the use of [Reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/). This is React-specific functionality, which caused us to change the implementation in project 4.

In project 4, Vue's recommended local state management solution, [Pinia](https://pinia.esm.dev/), is used. Pinia defines stores for your local state that are used much like hooks in React. A store has both a state and behavior (variables and functions), which can be used to update the state. The state is reactive, and will trigger a re-render of the component that uses the store.

#### Pinia versus Apollo reactive variables

The group's experience with local state management was that **Pinia offers more freedom regarding state management, whilst still providing a great API for their functionality**. By contrast, Apollo reactive variables acted more as a hybrid between `useState`, `useContext` and `useEffect`. This is because state was managed by the variable (like `useState`), and it could be passed around the DOM tree without prop drilling (like `useContext`), in addition to implicitly causing a `refetch` when the reactive variable was updated (like `useEffect`).

Furthermore, due to the freedom of Pinia, it is easier to integrate this with local storage, which is used to store the user session (see [`authStore.ts`](/frontend/src/stores/authStore.ts)).

Because Pinia does not integrate as well with Apollo as Apollo reactive variables, defining `watch` methods that `refetch` data when some state changes (much like `useEffect`) was necessary. This added some complexity to the codebase, but the group believes that the benefits of Pinia outweigh the added complexity.

### UI components and quality-of-life libraries

In project 3, [Mantine](https://mantine.dev/) was used for UI components. Additionally, Mantine comes with functionality for a color theme and useful hooks for form validation. Mantine is a great library for React, but unfortunately does not have a Vue version.

Hence, [Element Plus](https://element-plus.org/) is used in project 4. Regarding visual appearance, Element Plus is quite similar to Mantine. However, Element Plus does not come with much of the "batteries included" functionality of Mantine.

#### Element Plus versus Mantine

Because Element Plus strictly is a UI component library, there is no support for popularly used hooks, forcing the developers to use other libraries for this. [VueUse](https://vueuse.org/) was used to get these hooks, for instance [`useDark`](https://vueuse.org/core/usedark/) or [`useStorage`](https://vueuse.org/core/usestorage/). Furthermore, there is no form validation in Element Plus. This is solved by using [VeeValidate](https://vee-validate.logaretm.com/v4/) with [Yup schema validation](https://github.com/jquense/yup) when validating forms.

Furthermore, the group used [Tailwind CSS](https://tailwindcss.com/) for styling, as this offers a more concise way to style components than using CSS classes. This was done because Element had little to no support for styling related to positioning and layout, as opposed to what Mantine offered.

In summary, the experience with Mantine was **far better**. Mantine offered a great API for form validation, and had a lot of useful hooks. Furthermore, Mantine had a lot of styling options for positioning and layout, which Element Plus did not have.

## Testing and documentation

### Types of testing

The `frontend` has been tested using unit tests, snapshot tests, and end-to-end (E2E) tests.

For the unit tests, [Vitest](https://vitest.dev/) was used. We test that the schema validation to be used in our forms is working as intended.

For the snapshot tests, [Vitest](https://vitest.dev/) and [Vue Test Utils](https://v1.test-utils.vuejs.org/) was used. These tests are located in [`frontend/src/__tests__`](/frontend/src/__tests__).

For the E2E tests, [Cypress](https://www.cypress.io/) was used. These tests are located in [`frontend/cypress`](/frontend/cypress). We have written some helper functions for the Cypress tests, which are located in [`frontend/cypress/support/commands`](/frontend/cypress/support/commands.ts).

To enforce that these tests are _actually_ run, we have set up a GitLab continuous integration pipeline. For implementation details, see [`.gitlab-ci.yml`](/.gitlab-ci.yml).

#### Vitest and Vue Test Utils versus Jest and React Testing Library

The group's experience with Vitest was that it had a similar API to Jest, but was far better perfoming. However, Vitest with Vue Utils was much more difficult to work with than Jest with React Testing Library, as it is not as well documented and more errors occurred during test development. Hence, the group would recommend using Jest with React Testing Library over Vitest with Vue Test Utils.

The group's experience with Cypress was very similar between React and Vue. Cypress is a great tool for E2E testing, and the group would highly recommend it to test user interaction across the application regardless of which web-based frontend framework one uses.

### Commenting code

In addition to this documentation, we have written an overview of the [`frontend` documentation](/frontend/README.md) and the [`backend` documentation](/backend/README.md). This documentation is intended to be read by the peer reviewers, and offer a bird-eye view of each directory.

Furthermore, both the `backend` and `frontend` have been extensively commented. This is to ensure that the code is easy to understand, and to make it easier for future developers to work on the project.

## Git version control

Throughout the project lifecycle, tasks have been created as issues in GitLab with short-lived feature branches that resolve these issues. Commits have, to a large degree, been marked with the issue number they contribute to resolve. Additionally, all branches are marked with the issue number they resolve.

### Code etiquette and common conventions

The code base has an opinionated directory structure, separating different code in `components`, `hooks`, `lib`, `utils`, etc... These directories are again nested to allow for simpler filenames, components and functions that make sense in the context they are in. Code is documented using JSDoc where the group deems it necessary.

The project follows common conventions and linting rules defined by Vue. These rules are enforced by the linter, and are also checked by the GitLab CI pipeline. The linting rules are based on the ESLint configuration defined in [`frontend/.eslintrc.json`](/frontend/.eslintrc.json). This configuration, amongst other parts of the code base, is bootstrapped using [command-line tools recommended in Vue's documentation](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).
