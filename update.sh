
git pull
npm install
npm run clean
npm run build
cp -rf ./app/mock ./static

rm -rf static
mv staticnew static

