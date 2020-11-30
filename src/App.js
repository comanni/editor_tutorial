import './App.css';
import { Route } from 'react-router-dom';
import Tutorial from './Tutorial';


function App() {

  return (
    <div>
      <Route path="/" component={Tutorial} />
      {/* <Tutorial /> */}
    </div>
  );
}



export default App;
