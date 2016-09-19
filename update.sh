
git pull
npm install

npm run build
npm run clean

cp -rf ./app/mock ./static
pm2 restart oc-koa-test