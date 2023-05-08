import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './loginPage';

function App() {
  return (
    <>
    <Routes>
      <Route path='/'>
        <Route index element={<Login/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
