### Personal Site

```
git clone ...
sudo ln -s $(pwd)/danstewart.dev /data/www/danstewart.dev
sudo cp nginx/danstewart.dev /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-{available,enabled}/danstewart.dev
sudo certbot --nginx
```
