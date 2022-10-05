import logo from './logo.svg';
import './App.css';
import Stopwatch from './Components/stopwatch';
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers/combineReducers";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    
  <Provider store = {store}>
    <div className="App">
      <Stopwatch/>
    </div>
    </Provider>
  );
}

export default App;
