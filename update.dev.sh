cd /opt/yunhuni-peer-internet-front-oc
git pull
npm run build
npm run clean
cp -rf ./staticnew/** ./static/
