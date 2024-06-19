// App.js
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import Nav from './components/Nav';
import Home from './pages/Home';
import VolcanoList from './pages/Volcano_list';
import Register from './pages/Register';
import Login from './pages/Login';
import VolcanoMap from './pages/Volcano_page';
import Logout from './pages/Logout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/VolcanoList" element={<VolcanoList />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/Map" element={<VolcanoMap />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
