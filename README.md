<div align="center">
    <img src="https://raw.githubusercontent.com/atheius/s3-visualizer/main/images/bucket.svg" width="130" height="auto"/>
</div>

# S3 Bucket Visualizer

A simple app for visualizing files in an S3 bucket based on file size and extension.

## Preview

<div align="center" style="margin-top: 30px; margin-bottom: 30px;">
    <img src="https://raw.githubusercontent.com/atheius/s3-visualizer/main/images/screenshot.png"/>
</div>

## Quick start

Install dependencies:

```sh
npm install
```

To start the api in dev mode:

```sh
npm run api:dev
```

To start the web app in dev mode:

```sh
npm run web:dev
```

View the dev app at [http://localhost:3001](http://localhost:3001) in a browser.

For production mode:

```sh
npm start
```

View the production app at [http://localhost](http://localhost) in a browser.

## AWS

This app requires AWS permissions to list buckets and objects in S3.

AWS credentials are mounted in docker from `./aws`
