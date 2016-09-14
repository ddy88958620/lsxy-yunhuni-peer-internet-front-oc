
git pull
npm install
npm run clean
npm run build

cp -rf ./app/mock ./static
pm2 restart oc-koa-test