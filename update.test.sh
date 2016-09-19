cd /opt/yunhuni-peer-internet-front-oc
git pull
npm install
npm run build
npm run clean
cp -rf ./staticnew/** ./static/

pm2 restart oc-koa-test