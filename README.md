# protein_expression_front_end
A solo-authored production-level Angular 8.2 biomanufacturer (undisclosed) lab tool for compiling molecular databases during the molecular fabrication process. Actively used daily by lab technicians and scientists. Employs four levels of Angular environment configurations to accommodate CI/CD, specifically using in-memory-web-db for code implementation, Docker Desktop for phasing more advanced development with real-end-point simulation, and the staging/production automated deployment environments. Interfaced to various PostgreSQL-based REST back-ends. Angular Material was employed throughout, but advanced styling was limited due to the utilitarian priority of this software. The UI is also extensively responsive to support both monitors and tablets. End-to-end headless-Chrome testing is provided via Protractor 6-ish using ES8 async-await techniques. Finally, Angular purity has been maintained: no unnecessary third-party dependencies such as Bootstrap and jQuery have been used.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Requirements
- [node.js](https://nodejs.org) version 10 or later
- [npm](https://www.npmjs.com/) version 6 or later

## Install app and dependencies
1. Clone this repo to your local machine: `git clone https://github.com/AbSciBio/protein_expression_front_end.git`
2. Navigate to the root folder of the application: `cd protein_expression_front_end`
3. Install project dependencies: `npm i`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
