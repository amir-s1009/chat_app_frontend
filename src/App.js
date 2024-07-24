import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index path='login' element={< Login/>}/>
            <Route path='signup' element={< Signup/>}/>
            <Route path='home' element={< Home/>}/>
            <Route path='chat' element={< Chat/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
