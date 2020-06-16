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

## Typescript Project Files

**tsconfig** files can specify files and switches to be used across the project.  They also support a list of files.

For a full list of supported TypeScript Compiler Options, visit the [Typescript site](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

```json
{
  "compilerOptions": {
    "target": "es5",
    "sourceMap": true,            
    "outDir": "js",
    "strict": true,
    "watch": true
  },
  "files" : [
      "app.ts"
  ]
}
```
