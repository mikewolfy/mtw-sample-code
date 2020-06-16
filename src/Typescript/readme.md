# Typescript

My repo for collecting notes and sample code about Typescript.   The files in this project were pulled from a Pluralsight course: [TypeScript: Getting Started](https://app.pluralsight.com/library/courses/getting-started-typescript).

## Resources

- [Official Typescript Page](https://www.typescriptlang.org/)

## Sample Code :wrench:

### Install Typescript

```sh
npm install -g typescript
```

### Compile TypeScript

```sh
tsc  scriptfile.ts
```

### Other TSC Options

For a full list of supported TypeScript Compiler Options, visit the [Typescript site](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

```sh
tsc --version
tsc --help
tsc --h
tsc --init      // creates a new tsconfig.json file
```

## Typescript Project Files

**tsconfig** files can specify files and switches to be used across the project.  They also support a list of files.

The **tsc** compiler will look for a **tsconfig.json** file in its current directory.  If it doesn't find one, it will move up the directory structure until it finds one.

One **tsconfig** file can reference another using the **'extends'** keyword.

```json
{
  "extends": "../tsconfig.base",    /* specifies a base project file to extend */
  "compilerOptions": {
    "target": "es5",
    "sourceMap": true,            
    "outDir": "js",
    "strict": true,     /* enables strict type checking during compilation */
    "watch": true      /* leaves the compiler running during development */
  },
  "files" : [
      "app.ts",
      "./**/*.ts",  /* pattern to match on all ts files in all subdirectories */
      "./**/*.*"  /* pattern to match on all files in all subdirectories */
  ]
}
```

## TypeScript with WebPack

Webpack can be configured to compile typescript when it executes.  The open architecture of WebPack allows you to use the **ts-loader** extension.

```sh
npm install ts-loader --save-dev
```

Once that's installed, you can add the **module** section to the **webpack.config.js** file to tell WebPack to compile **ts** or **tsx** files, to exclude the **node_modules** folder, and to output to the **bundle.js** file.

```json
module.exports = {
  entry: './app/app.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    inline: false
  }
};
```
