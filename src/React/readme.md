# React.js

I'm trying to ramp up on React.js.  This is my place for keeping my sample code and notes.

## Pluralsight

I watched the [React: Getting Started](https://app.pluralsight.com/course-player?clipId=a028fa58-7f10-4613-9d46-0b4885bba5a7) course on [Pluralsight](https://app.pluralsight.com/library/)

## Tools for Learning

- [JsComplete Playground](https://jscomplete.com/playground) is a page that allows you to play with javascript.
- [JsDrops](https://jscomplete.com/playground/rgs1.1) is the author's way of recording certain snippets of code that are labelled with the given version.
- [Try out Babel](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.10.2&externalPlugins=) to see how JSX converts into javascript

## High Level

- React is **Declarative**: we tell it what to do, not how to do it
- build using **components**
- each component can have private state
- using a **virtual DOM** that’s managed in memory
- HTML is generated using JavaScript
- Components can be either **Function Components** or **Class Components**
- React uses **JSX** to build HTML, not actual javascript or HTML.  It can be built using **[Babel](https://babeljs.io/)**
- Component names need to begin with **uppercase** letters to avoid conflicts with native elements
- **State** in a React component can only be accessed by that particular component, NOT other components. HOWEVER, **state** CAN be accessed by **child components**.
- **props** are used to pass state into a component; the convention is to pass a parameter named **props**

## Snippets

### Function Componenet

Takes in props and returns to the DOM.  **props** are immutable.

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
    const handleClick = () => setCounter(counter+1);
    return <button onClick={handleClick}>
         {counter}
      </button>;
}

ReactDOM.render(
    <Button />,
    document.getElementById('mountNode'),
)
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
function Display(props){
    return (
        <div>{props.message}</div>
    );
}

function App() {
    const [counter, setCounter] = useState(42);
    return (
        <div>
            <Button />
            <Display message={counter}/>
        </>
    );
}
```

### Manage state with parent component
This snippet uses a parent component to pass button click events in one child component down to a differnt child component to display.
```javascript
function Button(props){
    return (
        <button onClick={props.onClickFunction}>
            +1
        </button>
    );
}

function App() {
    const [counter, setCounter] = useState(42);
    const incrementCounter = () => setCounter(counter+1);
    return (
        <div>
            <Button onClickFunction={incrementCounter}/>
            <Display message={counter}/>
        </>
    );
}
```