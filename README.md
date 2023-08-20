# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) or [Download & Install Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

## Downloading

```
git clone  https://github.com/Yuliya0503/nodejs2023Q2-service.git
```

Switch to branch HLSpart2:

```
git checkout HLSPart3
```

## Installing NPM modules

To install NPM modules, use the command:

```
npm install
```

## .env setting

In the absence of an .env file in the project's main directory, it is necessary to duplicate the .env.example file and rename it as .env.

## Docker

Should Docker not be installed by this stage, proceed to download, install, and initiate the Docker Desktop application.

## Docker Hub

The images are available on Docker Hub. Please complete the following steps:

1. Follow the link [https://hub.docker.com/u/yuliyanarkevich](https://hub.docker.com/u/yuliyanarkevich)

2. Created images [yuliyanarkevich/home-library_app](https://hub.docker.com/r/yuliyanarkevich/home-library_app) and [yuliyanarkevich/home-library_db](https://hub.docker.com/r/yuliyanarkevich/home-library_db)in Docker Hub.

3. To test your application with Docker Hub images, pull the images and run the containers by running the command (make sure port 4000 is free):

```
docker-compose up
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Docker Scout

After building the images using docker-compose up, you have the option to perform vulnerability and advisory scans using Docker Scout. To initiate the scan, execute the following command:

```
npm run docker:scan
```

## Networks

Check user-defined bridge(runs locally as Docker is not used in images):

```
docker network inspect library-service
```

### Auto-fix and format

Linter check:

```
npm run lint
```

Format check

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
