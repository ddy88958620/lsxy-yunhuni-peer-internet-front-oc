#!/bin/bash

CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
git pull origin $CURRENT_BRANCH
npm install
npm run build

# 构建之后, 会生成 build
rm -rf static
mv build static

