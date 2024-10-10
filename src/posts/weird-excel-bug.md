---
title: A weird bug due to having Excel installed
layout: "surround/blog_base.liquid"
date: 2021-11-07
updated: null
tags: ["post"]
---

A while ago I was working on building a basic web page that allowed a user to upload a CSV file to an S3 bucket using a [presigned S3 upload URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html).

This was easy enough, I tell AWS I want to upload a file with a `Content-Type` of `text/csv` and it will give me a pre-signed URL that I can use to upload without authenticating at the time of upload - nice and easy.

The confusing part came when I gave it to the user and they got an error that the presigned URL was invalid, which was odd since it ran on my machine perfectly fine and I sent the user the exact file I was testing with.

After some debugging I noticed the `Content-Type` from the users request was not `text/csv` but was `application/vnd.ms-excel`, for the **exact** same file.

It turns out that if you have Microsoft Excel installed (which I did not but the user did) it "hijacks" the MIME-Type of CSV files - since Excel will handle the file.

On Windows the MIME-Type of any given file type is stored in the registry, under `HKEY_LOCAL_MACHINE\Software\Classes` and when using Excel as the default application for `.csv` files it will update their MIME-Type to `application/vnd.ms-excel`.

In the end I just blanked out the `Content-Type` header (probably not the best solution but this was a only used by a single user and was behind authentication) and everything started working again.

[Source](https://stackoverflow.com/a/7076079)
