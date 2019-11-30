#!/bin/bash

if ! [ -x "$(command -v nvm)" ]; then
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
  nvm install node
  nvm use node
fi
echo "Use nvm version: $(nvm --version)"

if ! [ -x "$(command -v node)" ]; then
  echo 'Error: node is not installed.' >&2
  exit 1
fi
echo "Use node version: $(node --version)"

if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' >&2
  exit 1
fi
echo "Use npm version: $(npm --version)"

if ! [ -x "$(command -v yarn)" ]; then
  curl -o- -L https://yarnpkg.com/install.sh | bash
fi
echo "Use yarn version: $(yarn --version)"