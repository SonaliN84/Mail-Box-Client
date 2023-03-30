import {Switch,Route} from 'react-router-dom';
import './App.css';
import RootLayout from './Pages/RootLayout';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Users from './Pages/Users';
import ComposeEmail from './Pages/ComposeEmail';
function App() {
  return (
    <RootLayout>
      <Switch>
        <Route path='/Signup'>
         <Signup/>
        </Route>
        <Route path='/Login'>
         <Login/>
        </Route>
        <Route path='/Users'>
         <Users/>
        </Route>
        <Route path='/ComposeEmail'>
         <ComposeEmail/>
        </Route>
      </Switch>
    </RootLayout>
  );
}

export default App;
