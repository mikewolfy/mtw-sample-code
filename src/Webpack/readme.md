# Webpack


## To Install

```sh
npm install webpack -g
```

## To Execute

```sh
webpack ./app.js -o bundle.js
```

## Config File

Sets the default behavior so that you don't have to repeatedly supply all switches

```json
module.exports = {
    entry: [
        "./app.js",
        "./utils"
    ],
    output: {
        filename: "bundle.js"
    },
    mode: "none",
    watch: true
}
```

## Dev Server

Will run the output in the browser and refresh browser when something changes

### To Install

```sh
npm install webpack-dev-server
```

### To Run

```sh
webpack-dev-server
```
Use **--inline** to load the browser without the status bar, but with auto-refreshes

```sh
webpack-dev-server --inline
```

### Loaders

Loaders are a way to get WebPack to do new things.
