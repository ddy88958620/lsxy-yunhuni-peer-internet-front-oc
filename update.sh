cd /opt/yunhuni-peer-internet-front-oc
git reset HEAD --hard
git pull orgin develop
npm run clean
npm run build
npm run mock
