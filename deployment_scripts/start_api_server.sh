cd /api-server
npm install --silent
npm run transpile
cp .env.dev .env
npm run start:prod
