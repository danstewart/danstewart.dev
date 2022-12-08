# danstewart.dev

This repository contains the code for https://danstewart.dev and my blog posts.

### Usage

This project uses [hermit](https://cashapp.github.io/hermit/usage/get-started/) to manage the node/npm/npx install.

```
# Activate hermit
source bin/activate-hermit

# Install dependencies
npm install

# Run 11ty website locally
npm run serve

# Build 11ty site to ./build
npm run build

# Copy files to appropriate location to serve
cp -r build/* /data/www/danstewart.dev
```
