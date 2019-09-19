# Introduction

This application executes in a browser and is served via nginx in a docker container. The Dockerfiles in this
directory builds the code and copies it to the docker image to be served as static content from nginx.

There are at least a couple different methods that can be used for this Docker image to run which are detailed below.

## Environments

### Local

Build and run the frontend application from docker for local development purposes. 
This uses 'ng serve' and is not suitable for production. This will run in the foreground
in your terminal. You may edit code and it will refresh whenever you edit code as 
ng serve typically does. Ctrl-C will kill the docker'ized 'ng serve' process.

```
#Repeat this step as necessary to update node_modules in the image.
docker build -t protein-expr-fr:local .
docker run -it -v ${PWD}:/app -v /app/node_modules -p 4200:4200 --rm protein-expr-fr:local
```

Unit tests are run as part of the 'docker build' command. To run unit tests manually, see:

```
docker run -it --rm protein-expr-fr:local ng test --browsers ChromeHeadless --watch=false
```

### Dev server

```
docker build -f Dockerfile-dev -t protein-expr-fr:dev .
```

### Prod server

```
docker build -f Dockerfile-prod -t protein-expr-fr .
```
