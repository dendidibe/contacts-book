#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git push -f git@github.com:dendidibe.github.io.git master
cd -