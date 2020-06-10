import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// function Button(props) {
//   const handleClick = () => props.onClickFunction(props.increment);
// 	return (
//   	<button onClick={handleClick}>
//       +{props.increment}
//     </button>
//   );
// }

// function Display(props) {
// 	return (
//   	<div>{props.message}</div>
//   );
// }

// function MyApp() {
// 	const [counter, setCounter] = useState(0);
//   const incrementCounter = (incrementValue) => setCounter(counter+incrementValue);
// 	return (
//     <div>
//       <Button onClickFunction={incrementCounter} increment={1} />
//       <Button onClickFunction={incrementCounter} increment={5} />
//       <Button onClickFunction={incrementCounter} increment={10} />
//       <Button onClickFunction={incrementCounter} increment={100} />
//       <Display message={counter}/>
//     </div>  
//   );
// }

// ReactDOM.render(
//   <MyApp />, 
//   document.getElementById('root'),
// );