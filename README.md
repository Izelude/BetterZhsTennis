# BetterZhsTennis
TypeScript Node backend that serves a basic React “Hello world” page.

## Run (directly from GitHub with npx)
If this repo is on GitHub as `userName/projectName`, you can run it without installing:

```bash
npx userName/projectName -- --port 3000
```

If your npm setup doesn’t resolve that shorthand, this equivalent form also works:

```bash
npx github:userName/projectName -- --port 3000
```

Then open `http://127.0.0.1:3000/`.

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
