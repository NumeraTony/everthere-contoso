## Installation

at the root folder:
> npm install 

```
npm WARN deprecated express3-handlebars@0.5.0: THIS PACKAGE HAS BEEN RENAMED TO: express-handlebars
express3-handlebars@0.5.0 node_modules/express3-handlebars
├── async@0.2.10
├── semver@2.3.2
├── glob@3.2.11 (inherits@2.0.1, minimatch@0.3.0)
└── handlebars@1.3.0 (optimist@0.3.7, uglify-js@2.3.6)

express@3.4.8 node_modules/express
├── methods@0.1.0
├── debug@0.8.1
├── merge-descriptors@0.0.1
├── range-parser@0.0.4
├── fresh@0.2.0
├── cookie-signature@1.0.1
├── buffer-crc32@0.2.1
├── cookie@0.1.0
├── mkdirp@0.3.5
├── commander@1.3.2 (keypress@0.1.0)
├── send@0.1.4 (mime@1.2.11)
└── connect@2.12.0 (uid2@0.0.3, qs@0.6.6, pause@0.0.1, raw-body@1.1.2, bytes@0.2.1, batch@0.5.0, negotiator@0.3.0, multiparty@2.2.0)
```

## Run

> node constoso-server.js

```
$ node contoso-server.js true
node contoso-server.js true
listening on port 3335 .
```

## Setup NGinx as proxy to forward traffic to port 3335

```
upstream contoso-everthere-app.node.server {
    server 127.0.0.1:3335;
}

server {
    listen       80;
    server_name  dev-contoso-everthere.numera-alpha.com;

    # pass requests to node.
    location / {
        proxy_set_header X-Real-IP       $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass      http://contoso-everthere-app.node.server;
    }
}
```


Test with

http://dev-contoso-everthere.numera-alpha.com:8180/

> Note the 8180 is a docker forward port to 80 

* Note 2: if the nginx configuration is modified you might have to do a (as root in docker container)

> ps -aux
> (look for nginx: master process)
> kill -15 <processId>
> 


# Staging

http://contoso-everthere.numera-staging.com (port 80)

