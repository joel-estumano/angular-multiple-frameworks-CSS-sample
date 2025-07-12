# Angular Multiple Frameworks CSS Sample

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Ferramentas essenciais para o desenvolvimento ✍

Prettier

```bash
npm install --save-dev --save-exact prettier eslint-config-prettier eslint-plugin-prettier
```

- Configure `.prettierrc` e `.prettierignore` files.

- In `package.json` file set script `"format": "npx prettier . --write"`.

Typescript

```bash
npm i -D typescript-eslint
```

ESLint

```bash
npm install --save-dev eslint angular-eslint
```

- In `angular.json` file add the property in the object `projects.<name-of-your-application>.architect`

```
"lint": {
          	"builder": "@angular-eslint/builder:lint",
          	"options": {
            	"lintFilePatterns": [
              	"src/**/*.ts",
              	"src/**/*.html"
            ]
          }
        }
```

- In `eslint.config.js` file add `eslint-plugin-prettier/recommended` and other rules.
- In `package.json` file set script `"lint": "ng lint"`.
