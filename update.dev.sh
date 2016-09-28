cd /opt/yunhuni-peer-internet-front-oc
git pull
rm -rf ./staticnew/*
npm run build
npm run clean
cp -rf ./staticnew/** ./static/
