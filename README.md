
  

# [OpenSauce Website](https://github.com/opensauce-uk/website)

  

  

#### Introduction

  

The OpenSauce website is a proof of concept in our UX assignment instead of only designing prototypes we instead took it to the next level and started to design an live interactive website, the website itself is not finished but helped our team practice multiple skills in hopes of developing our experience and skills.

  

  

#### Requirements

  

- Ubuntu 18.04 or Ubuntu 20.04 / Debian

  

-  [git](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04), [nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04), [certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx) and [php7.2-fpm](https://www.linode.com/docs/guides/serve-php-php-fpm-and-nginx/)

  

  

#### Nginx Config

  

```

  

server {

  

listen 443 ssl;

  

listen [::]:443 ssl;

  

server_name domain.com;

  

ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;

  

ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  

ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

  

root /opt/example/website;

  

index home.html;

  

location / {

  

try_files $uri $uri/ =404;

  

}

  

location ~ \.php$ {

  

include snippets/fastcgi-php.conf;

  

fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;

  

}

  

error_page 400 /errorpages/400.html;

  

error_page 401 /errorpages/401.html;

  

error_page 403 /errorpages/403.html;

  

error_page 404 /errorpages/404.html;

  

error_page 500 /errorpages/504.html;

  

  

location /errorpages/ {

  

alias /opt/example/website/errorpages/;

  

internal;

  

}

  

  

}

  

```

  

### Development tools used

  

#### User Testing

  

[Browser Stack](https://www.browserstack.com/) was used to help test our website in various devices and helped us improve the design and look of the site in different devices.

  

[Lambatest](https://lambdatest.com/) was used to test our website in different browsers, devices and location

  

  

#### Media

  

[BunnyCDN](https://bunnycdn.com/?ref=9u4b518hoc) was used to host our images and assets.

  

  

#### Design

  

[Figma](https://www.figma.com/) was used to design our prototypes and website.

  

  

#### Development

  

[Gitbook](https://www.gitbook.com/) was used to document anything e.g our API.

  

[Postal](https://github.com/postalhq/postal) was our mail server used to send and recieve and send mail.

  

  

#### Stats

  

[umami](https://github.com/mikecao/umami) was our in-house solution of keeping track of data without third-parties

  

#### Hosting

[vercel](https://vercel.com) was used to host our API and website free of charge.

  

#### Repos required for website to work

  

[Postal Webhook Server](https://github.com/opensauce-uk/postal-discord-webhook) (Optional)

  

[Backend API](https://github.com/opensauce-uk/auth-server) (Required)