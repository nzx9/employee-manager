# Employee Manager

## Run using docker

- in `web` folder rename .env.sample to .env
- in `api` folder rename .env.sample to .env

```bash
docker compose up --build -d
```

Then, navigate to `localhost:3000` in browser

## Without Docker

### Run `web`

- in `web` folder rename .env.sample to .env
- Change NEXT_PUBLIC_API_URL to <http://localhost:5000>
- Run `npm run build`
- Then run `npm start`

### Run `api`

- in `api` folder rename .env.sample to .env
- Change postgreSQL db configurations
- Do the migrations in migrations folder
- Run `npm start`

## Run Tests

```bash
cd api
npm test
```

## Hosted System

- URL: <http://140.238.209.143>
