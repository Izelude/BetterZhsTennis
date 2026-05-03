# BetterZhsTennis
TypeScript Node backend that serves a basic React “Hello world” page.

## Run (directly from GitHub with npx)
Run this directly from GitHub

```bash
npx Izelude/BetterZhsTennis
```
This will start the app on port 3000.

## Obtain ory session cookie value
To obtain the ory-session cookie (required to proxy your requests to zhs, the cookie value never leaves your machine, except to call the zhs backend), log in at 
https://kurse.zhs-muenchen.de/de/product-offers/21114da0-4246-42b1-bab6-8d7ac49bb14f?refinementList%5Btags.Standort%5D%5B0%5D=Beach-+und+Tennisanlage
then using dev tools in your browser look for the ory-session cookie on that website and copy its value to use with BetterZhsTennis.
I have no idea how long the cookie is valid, but while playing around with this i was using mine for multiple days.

More features to come.
## Run locally

```bash
npm install
npm run dev
```

## Build + run locally (production)

```bash
npm run build
npm start -- --port 3000
```

## Flags / env
- **`--port <number>`** or `PORT=<number>`
- **`--host <string>`** or `HOST=<string>`
- **`--open`**: force open in default browser
- **`--no-open`**: do not open browser (useful for CI/headless)

## Auth (local cookie)
The app will prompt you for the `ory-session` value in the browser and store it in a local cookie (`ory_session`).
