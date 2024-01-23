import './App.css';
import Register from './pages/Register';
import Login from '../src/pages/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { User } from './pages/User';
// import { Dashboard } from './pages/Dashboard';
import Update from './pages/Update';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
        {/* <Route path="/dashboard" element={<Dashboard />}/> */}
        <Route path="/user" element={<User />}/>
        <Route path="/update/:id" element={<Update />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
