#!/bin/sh
setup_git() {
  git config --global user.email "contact@democracy-deutschland.de"
  git config --global user.name "Travis CI"
}
commit_ios_files() {
  git checkout $TRAVIS_BRANCH
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER (no-deploy)"
}
upload_files() {
  git pull --quiet
  git push --quiet
}
setup_git
commit_ios_files
upload_files