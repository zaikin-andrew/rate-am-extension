# RateAm

Fast way to get USD2RUB rates from rate.am

## Instruction for build production version

#### Requirements: node - v14.17.0, npm - 6.14.13

Install dependencies `npm i`

Run `npm run build-prod` to build extension. The build artifacts will be stored in the `dist/` directory.

## Live Reload

Run `npm run watch` for live reload extension.

If you updated manifest.json, you need reload extension manually.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build-prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Use

Open Chrome Extensions > Development mode: ON and Load unpacked > open folder `rate-am` from `dist/` directory.
