import { Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './page/register';
import Login from './page/login';
import Home from './page/home';
import { DefaultLayout } from './Layout';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return ( 
  <div>
    <Routes>
      <Route path='/register' element = {<Register />}/>
      <Route path='/login' element = {<Login/>} />
      <Route path='/' element= {<DefaultLayout><Home/></DefaultLayout>} />
    </Routes>
  </div>
  );
}

export default App;
