import { Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './page/register/Register';
import Login from './page/login/Login';

function App() {
  return ( 
  <div>

    <Routes>
      <Route path='/register' element = {<Register />}/>
      <Route path='/login' element = {<Login/>} />
    </Routes>
  </div>
  );
}

export default App;
