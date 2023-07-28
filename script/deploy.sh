#!/usr/bin/env sh

# abort on errors
set -e

# build
npx nuxi build
npx nuxi generate

# Push modifications
git add -A
git commit -m 'deploy'
git push -f git@github.com:IFB-ElixirFr/R_WASM.git main:main

# navigate into the build output directory
cd .output/public/
touch .nojekyll 

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:IFB-ElixirFr/R_WASM.git main:gh-pages
cd ..