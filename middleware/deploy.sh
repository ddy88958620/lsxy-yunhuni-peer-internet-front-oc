CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
git pull origin $CURRENT_BRANCH
npm install
pm2 restart oc-koa
