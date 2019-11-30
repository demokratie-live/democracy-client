#!/bin/sh
setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}
commit_ios_files() {
  git checkout -b gh-pages
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}
upload_files() {
  git remote add origin-pages https://${GITHUB_API_TOKEN}@github.com/demokratie-live democracy-app.git > /dev/null 2>&1
  git push --quiet --set-upstream origin-pages gh-pages 
}
setup_git
commit_ios_files
upload_files