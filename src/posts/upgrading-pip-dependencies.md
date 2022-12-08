---
title: Upgrading and housekeeping python dependencies
layout: "surround/blog_base.liquid"
date: 2021-12-05
updated: null
tags: ["post"]
---

This post will provide give a quick overview into two tools to help keep your `requirements.txt` up to date and clean.

## Updating dependencies using [pip-upgrader](https://github.com/simion/pip-upgrader)

The first tool is [pip-upgrader](https://github.com/simion/pip-upgrader) which provides an easy interface for finding out of date dependencies and updating them.

Install via pip:

```shell
python3 -m pip install pip-upgrader
```

Then run:

```shell
python3 -m pip-upgrade
```

You will be presented with a list of your dependencies which have new versions and you can select which to upgrade.

You will of course still need to check for breaking changes in your dependencies but this tool makes it easy to find what packages have new versions.

---

## Figuring out what depends on what with [pipdeptree](https://pypi.org/project/pipdeptree/)

The second tool is [pipdeptree](https://pypi.org/project/pipdeptree/) which displays a dependency tree, making it easy to see which dependencies depend on other packages and help you clean up unused transitive dependencies.

```shell
python3 -m pip install pipdeptree
python3 -m pipdeptree
```
