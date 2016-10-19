CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
git pull origin $CURRENT_BRANCH
npm install
npm run doc
pm2 restart oc-koa
