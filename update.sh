cd /opt/yunhuni-peer-internet-front-oc
git reset HEAD --hard
git pull
npm run clean
npm run build
cp -rf ./app/mock ./static
