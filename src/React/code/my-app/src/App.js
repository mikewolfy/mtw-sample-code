import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MyApp />
    </div>
    
  );
}

function MyApp() {
  const [counter, setCounter] = React.useState(0);
  const incrementCounter = (incrementValue)=> setCounter(counter+incrementValue);
  return (
    <div>
      <Button onClickFunction={incrementCounter} increment={3} />
      <Display message={counter}/>
    </div>
  );
}

function Display(props) {
  return (
    <div>
      {props.message}
    </div>
  )
}

function Button(props) {
  return (
    <button onClick={props.onClickFunction(props.increment)}>
      +{props.increment}
    </button>
  )
}

export default MyApp;
