# React.js

I'm trying to ramp up on React.js. This is my place for keeping my sample code and notes.

## Pluralsight

I watched the [React: Getting Started](https://app.pluralsight.com/course-player?clipId=a028fa58-7f10-4613-9d46-0b4885bba5a7) course on [Pluralsight](https://app.pluralsight.com/library/)

## First React.js App

To setup your first web app, including React.js, Webpack, & Babal, follow the simple instructions outlined on this [reactjs.org page](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).

## Tools for Learning

- [JsComplete Playground](https://jscomplete.com/playground) is a page that allows you to play with javascript.
- [JsDrops](https://jscomplete.com/playground/rgs1.1) is the author's way of recording certain snippets of code that are labelled with the given version.
- [Try out Babel](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.10.2&externalPlugins=) to see how JSX converts into javascript

## High Level Details of React

- React is **Declarative**: we tell it what to do, not how to do it
- build using **components**
- each component can have private state
- using a **virtual DOM** that’s managed in memory
- HTML is generated using JavaScript
- Components can be either **Function Components** or **Class Components**
- React uses **JSX** to build HTML, not actual javascript or HTML. It can be built using **[Babel](https://babeljs.io/)**
- Component names need to begin with **uppercase** letters to avoid conflicts with native elements
- **State** in a React component can only be accessed by that particular component, NOT other components. HOWEVER, **state** CAN be accessed by **child components**.
- **props** are used to pass state into a component; the convention is to pass a parameter named **props**
- in general, **state** should be managed as close to the component(s) that need it
- React requires a **ReactDOM.render** call, which accepts 2 arguments: a <Component> AND a DOM node

## Steps to Create a React App

### Quick Setup

The following steps can be used to get a React application up and running **Quickly**

1. Install Node.js
2. You can run `npx create-react-app my-app` to create an app
3. Optionally you can run `npm run eject` to copy the configurations to your local environment where you modify them from the 'config' directory

### Step by Step Update

Follow [these steps](https://jscomplete.com/learn/1rd-reactful) to setup an environment one step at a time.

1. `npm init` will initialize your app
2. `npm i express` will pull in a package for running a server
3. `npm i react react-dom` will pull the 2 react packages
4. `npm i webpack webpack-cli` will bundle up all of the javascript modules and all of their dependencies
5. `npm i babel-loader @babel/core @babel/node @babel/preset-env @babel/preset-react` will convert JSX into JavaScript
6. `npm i -D nodemon` a watcher that will restart node if changes are detected
7. `npm i -D eslint babel-eslint eslint-plugin-react eslint-plugin-react-hooks` ESLint will check for code quality and check for coding errors. Also included are packages to help eslint understand react
8. `npm i -D jest babel-jest react-test-renderer` is used to test javascript

## React Snippets

### Function Componenet

Takes in props and returns to the DOM. **props** are immutable.

```javascript
const MyComponent = (props) => {
    return (
        <domElementOrComponent> ... />
    );
}
```

### Class Component

```javascript
class MyComponent extends React.Component {
    render () {
        return (
            <domElementOrComponent> ... />
        );
    }
}
```

### useState() function

```javascript
function Button() {
  const [counter, setCounter] = useState(0);
  const handleClick = () => setCounter(counter + 1);
  return <button onClick={handleClick}>{counter}</button>;
}

ReactDOM.render(<Button />, document.getElementById("mountNode"));
```

### Render Multiple React Componenets

```javascript
ReactDOM.render(
    <React.Fragment>
        <Button />
        <Display />
    </React.Fragment>
    document.getElementById('mountNode');
);

// ALSO WRITTEN AS
ReactDOM.render(
    <>
        <Button />
        <Display />
    </>
    document.getElementById('mountNode');
);

// ALSO WRITTEN AS
ReactDOM.render(
    <div>
        <Button />
        <Display />
    </div>
    document.getElementById('mountNode');
);

// ALSO WRITTEN AS
function App() {
    return (
        <div>
            <Button />
            <Display />
        </div>
    );
}

ReactDOM.render(
    <App />
    document.getElementById('mountNode');
);
```

### Pass props to a component

```javascript
function Display(props) {
  return <div>{props.message}</div>;
}

function App() {
  const [counter, setCounter] = useState(42);
  return (
    <div>
      <Button />
      <Display message={counter} />
    </>
  );
}
```

### Manage state with parent component

This snippet uses a parent component to pass button click events in one child component down to a differnt child component to display.

```javascript
function Button(props) {
  return <button onClick={props.onClickFunction}>+1</button>;
}

function App() {
  const [counter, setCounter] = useState(42);
  const incrementCounter = () => setCounter(counter + 1);
  return (
    <div>
      <Button onClickFunction={incrementCounter} />
      <Display message={counter} />
    </>
  );
}
```

## JavaScript Snippets

These snippets include examples of JavaScript utilizing ECMAScript 6 (ES6)

### Nested Block Scopes and Let Variables

**Block scopes** historically have 'leaked' access to their internal variables that were defined using the **var** keyword. NOW, using **block scopes** and the **let** or **const** keywords you can limit a variables scope to within its block of code.

```javascript
{
  {
    {
    }
  }
}

//OR

for (let i = 1; i <= 10; i++) {
  //Block Scope
}

//OR

if (true) {
  //Block Scope
}

//OR

{
  // Block Scope
}

// IN CONTRAST TO FUNCTION SCOPE

function sum(a, b) {
  // Function Scope
  var result = a + b;
}

sum(4 + 3);
```

### Arrow Functions

Shorter syntax with better predictability as to the scope of the execution. Using braces '()' means the scope is wrapped as the scope of the DEFINING environment.

This syntax can be handy with functional programs or when being passed in to map() functions.

```javascript
//THE OLD WAY
const X = function () {
  // 'this' comes from the calling environment
};

//THE NEW WAY
const Y = () => {
  // 'this' comes from the defining environment
};
```

### Object Literals

This new syntax for defining objects

```javascript
const obj = {
  p1: 10,
  p2: 20,
  f1() {},
  f2: () => {},
  [mystery]: 42,
};
```

### Destructuring

Allows you to destructure an object into:

- a set of variables
- a copy of an array
- a few variables and an array

```javascript
// if I have a Math object, I can do this
const { PI, E, SQRT2 } = Math;

// instead of this:
const PI = Math.PI;
const E = Math.E;
const SQRT2 = Math.SQRT2;

// I can also use brackets {} to destructure an object parameter into its parts
const circleArea = ({}) => (PI * radius * radius).tofixed(2);

// Use the '...' remaining operator to destructure all remaining properties
const { temp1, temp1, ...person } = data;

// Use this syntax to copy an existing array
const newArray = [...itemsArray];
```

### Desctructuring to Set Defaults

```javascript
//this code sets a destructured parameter named 'radius and a 'precision
// parameter that is optional and defaults to 2
const circleArea = ({ radius }, ({ precision = 2 } = {}));
```

### Template Strings

Historically you could define string variables using single or double quotes. Now you can use the backtick to define template strings, which allow for **interpolation** of the strings.

```javascript
const html = `
    <div>
        ${Math.random()}
    </div>
`;
```

### Classes

Classes are now supported. They can be defined and inherited.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, level) {
    super(name);
    this.level = level;
  }
}
```

### Promises and Async/Await

These API's support asyncronous calls

```javascript
// OLD WAY
// const fetchData = () => {
//   fetch('https://api.github.com').then(resp => {
//     resp.json().then(data => {
//       console.log(data);
//     });
//   });
// };

// NEW WAY
const fetchData = async () => {
  const resp = await fetch("https://api.github.com");
  const data = await resp.json();
  console.log(data);
};

fetchData();
```

## Testing React

Options for testing React include

- Jest
- Mocha
- Jasmine
- Tape

### Jest

- from Facebook
- most popular way to test React.js
- offers command line interface
- offers snapshot testing

### Helper Utils

- React Test Utils:
  - shallow rendering only renders what you need to test
  - no DOM required
- **Enzype** is built on TOP of React Test Utils and is easier to use
  - has a great API

### Configuring package.json

To run tests using Jest, simply add one line to the scripts section of package.json

```json
    "scripts": {

        "test": "jest"
        //OR
        "test": "jest --watch"  //will automatically run the tests
    },
```

- Jest only runs files with the **.test.js** or **.spec.js** files
- Jest can be configured to exclude certain types of files
- Snapshot testing

## Prettier Package

Prettier is a package that will auto-format your javascript.

> NOTE: in Visual Studio Code, turn on Auto-Format by going to File | Preferences | Settings and searching for 'formatOnSave'
