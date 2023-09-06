import { Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './page/register';
import Login from './page/login';
import Home from './page/home';
import Detail from './page/detail';
import CreatePage from './page/create';
import EditPage from './page/edit';
import Invoice from './page/invoice';
import { DefaultLayout } from './Layout';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return ( 
  <div>
    <Routes>
      <Route path='/register' element = {<Register />}/>
      <Route path='/login' element = {<Login/>} />
      <Route path='/' element= {<DefaultLayout><Home/></DefaultLayout>} />
      <Route path='/detail/:productId' element= {<DefaultLayout><Detail/></DefaultLayout>} />
      <Route path='/product/create' element= {<DefaultLayout><CreatePage/></DefaultLayout>} />
      <Route path='/product/edit/:productId' element= {<DefaultLayout><EditPage/></DefaultLayout>} />    
      <Route path='/invoice' element= {<DefaultLayout><Invoice/></DefaultLayout>} />

    </Routes>
  </div>
  );
}

export default App;
