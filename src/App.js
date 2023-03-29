import {Switch,Route} from 'react-router-dom';
import './App.css';
import RootLayout from './Pages/RootLayout';
import Signup from './Pages/Signup';
function App() {
  return (
    <RootLayout>
      <Switch>
        <Route path='/Signup'>
         <Signup/>
        </Route>
      </Switch>
    </RootLayout>
  );
}

export default App;
