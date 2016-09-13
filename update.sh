cd /opt/yunhuni-peer-internet-front-oc
git pull
npm run clean
npm run build
cp -rf ./app/mock ./static
pm2 restart oc-koa-dev