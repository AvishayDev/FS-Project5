import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './loginPage';
import { useEffect } from 'react';
import Layout from './Layout';
import Info from './Info';
import Todos from './Todos';
import Posts from './Posts';
import Albums from './Albums';
import Album from './Album';

function App() {
  const navigate = useNavigate()

  useEffect(()=> {navigate('/login')},[])

  return (
    <>
    <Routes>
      <Route path='/'>
        <Route path='login' element={<Login/>} />
        <Route path='users/:id' element={<Layout/>}>
            <Route path='info' element={<Info/>}/>
            <Route path='todos' element={<Todos/>}/>
            <Route path='posts' element={<Posts/>}/>
            <Route path='albums' element={<Albums/>}>
              <Route path=':id/photos' element={<Album/>}/>
            </Route>
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
