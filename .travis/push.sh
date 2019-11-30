#!/bin/sh
setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}
commit_ios_files() {
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}
upload_files() {
  git push --quiet
}
setup_git
commit_ios_files
upload_files