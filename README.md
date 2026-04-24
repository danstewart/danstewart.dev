# danstewart.dev

This repository contains the code for https://danstewart.dev and my blog posts.

### Usage

This project uses [mise](https://mise.jdx.dev/) to manage the node/npm/npx install.

```
# Install mise
curl https://mise.run | sh

# Install dependencies
mise exec node@24 -- npm install

# Run 11ty website locally
mise exec node@24 -- npm run serve

# Build 11ty site to ./build
mise exec node@24 -- npm run build

# Copy files to appropriate location to serve
./deploy.sh
```
