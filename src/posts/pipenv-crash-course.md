---
title: Pipenv Crash Course
layout: "surround/blog_base.liquid"
date: 2022-12-05
updated: 2023-01-11
tags: ["post"]
---

### Installing packages

You can install packages with `pipenv install`.

The first time you do this it will create:

- A new virtual environment
- A file named `Pipfile`
- A file named `Pipfile.lock`

```shell
pipenv install rich
pipenv install rich==12.6.0
pipenv install "rich<=12.5.1"
```

<fieldset class="admonition info mt-15">
    <legend>ℹ️</legend>
    When adding new dependencies it's a good idea to use <code>pipenv install --keep-outdated $package</code><br />
    If this flag is omitted then <code>pipenv</code> will update all other dependencies.
</fieldset>

### The `Pipfile` and `Pipfile.lock`

The `Pipfile` defines all of your dependencies and any versions you want to pin.

```toml
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
rich = "*"

[dev-packages]

[requires]
```

The `Pipfile.lock` keeps track of the installed versions of your dependencies and any transitive dependencies, as well as hashes of the downloaded files.

You should never need to touch this file, it is managed by `pipenv`.

### Updating

You can use `pipenv update` to update dependencies and re-generate your lock file.
If your `Pipfile` does not specify any version constraints then the latest versions will be installed.

### Deploying

You should use `pipenv sync` when deploying your code to install dependencies as specified in the `Pipenv.lock`.
You can use `pipenv sync --system` to install the packages without a virtual environment too.

### Installing from another repository

One of the main benefits over regular `pip` is that you can specify where to install each individual dependency from, here is an example from the [pipenv documentation](https://pipenv.pypa.io/en/latest/advanced/#specifying-package-indexes):

```toml
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[[source]]
url = "https://download.pytorch.org/whl/cu113/"
verify_ssl = false
name = "pytorch"

[dev-packages]

[packages]
torch = {version="*", index="pytorch"}
numpy = {version="*"}
```

This helps to avoid [dependency confusion](https://www.activestate.com/resources/quick-reads/dependency-confusion/), an issue which [recently bit pytorch](https://www.bleepingcomputer.com/news/security/pytorch-discloses-malicious-dependency-chain-compromise-over-holidays/).
