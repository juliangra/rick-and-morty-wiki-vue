# Universal design, web accessibility and sustainable development

## Universal design

The official [7 principles of universal design](https://universaldesign.ie/what-is-universal-design/the-7-principles/the-7-principles.html) apply to the design of the website in the following manner:

### Principle 1: Equitable Use

Because the application is a website, as long as a user has a web browser, they can access the application. The application is also designed to be used on mobile devices, so users can access the application on the go.

### Principle 2: Flexibility in Use

The design is adaptable to the user's pace. For instance, no timeout is set on any operation in the application. The user is not forced to complete any operation in a certain time frame.

### Principle 3: Simple and Intuitive Use

The website is simple to use, and has little complexity.

Furthermore, the user is provided with fitting feedback when interacting with the website. This goes for both text feedback and visual feedback. When loading data, the website displays a loading spinner. When an error has occurred, the user is provided with a message explaining what went wrong.

### Principle 4: Perceptible Information

The design has adequate contrast between the background and foreground colors. This makes it easy for users to read the text on the website. This is achieved largely by using Mantine components and their pre-built styling system.

Essential information is presented **legible** manner. For instance, toggling between light and dark mdoe is intuitive due to the use of conventional and simple icons when toggling.

### Principle 5: Tolerance for error

The user interface is simple and clean in order to minimize the risk of errors. The user is provided with feedback when interacting with the website, and the feedback is clear and concise.

In case of an error, the Apollo client provides both `data`, `loading` and `error` states. This makes it easy to handle errors in the application.

An example of our fail safe functionality is if the user tries to access a character that does not exist. If so, the user is redirected to a `/404` error page.

### Principle 6: Low physical effort

In order to minimize repetetive actions, we store the current `filter` of characters and the sorting `order` of users as local state. This means that the user does not have to re-select the filter and sorting order every time they switch between views on the website.

### Principle 7: Size and space for approach and use

In order to accomodate different sizes of devices, the website is designed to be responsive. This means that the website is designed to adapt to the size of the device it is being viewed on.

## Web accessibility

One of the primary reasons for choosing Mantine as the UI library was its promise of focusing on usable and accessible components. Components in the documentation **explicitly state that they follow conventional accessbility guidelines**, for instance the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) standard. This means that the components are designed to be accessible by default.

Our custom components are wrapper around Mantine components, and therefore follow the same accessibility guidelines.

## Sustainable development

Measuring the sustainability of the website is more difficult. According to [Sustainable Web Design](https://sustainablewebdesign.org/), we can employ some strategies to evaluate the sustainability of our application. The development group has selected a smaller set of strategies and issues that we deem relevant to discuss.

### Design

#### Intuitive user journeys

The user journey was planned to be simple and intuitive. More precisely, the user can use main functionality of the application without being logged in, i.e. the user can search and filter characters, in addition to sorting users based on number of ratings. **We do not limit any functionality that does not require a signed in user**. After signing up and logging in, the user can rate characters and still use all intended functionality.

#### Works across different platforms and devices

Furthermore, the experience is optimized to work across different platforms, screens and devices. This is ensured using Mantine components, which are designed to be responsive.

### Content and marketing

#### Accessibility

The content of the website is accessible. This is ensured by using Mantine components, which are designed to be accessible by default. For more details, see the **Web accessibility** section above.

### Development

#### Modular and reusable code

In `frontend`, the Mantine UI library makes you select the components you want to use, and only imports the components you need. This means that the application is not bloated with unused code. For more information, see the [Mantine Getting Started](https://mantine.dev/pages/getting-started/) documentation.

In `backend`, we use a bundler and transpiler called [Rollup](https://rollupjs.org/guide/en/). Rollup includes tree-shaking, which means that unused code is removed from the bundle. This means that the application is not bloated with unused code. For more information on why one would want to use Rollup for Node projects, please read [here](https://rollupjs.org/guide/en/#the-why).

#### Agile workflow

The group has practiced an agile workflow, pracitising sprint planning, frequent code reviews and sprint retrospective. This improved the time usage during the project, ensured that the team was on the same page, and **minimized technical debt**.

#### Web standards

The website follows web standards, and is built using modern technologies that adheres to conventional and standardized guidelines on accessability, usability and performance.

#### Open source tools

All technology used in the project is open source. This means that the project is not dependent on any proprietary software.

## Back to the documentation

[Click here to go back to the documentation](/docs/README.md).
