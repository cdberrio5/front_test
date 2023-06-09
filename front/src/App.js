import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import Navbar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';



function App() {
  return (
    <div className="App">
      <ToastContainer />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Navbar />} />
            <Route path="products" element={<Navbar />} />
          </Route>
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
