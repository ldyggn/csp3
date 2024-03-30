import './App.css';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
import Products from './pages/Products'
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct'
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';

function App() {

  const [user, setUser] = useState({
      id: null,
      isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/users/details', {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if (typeof data.user !== "undefined") {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        })

      } else {

        setUser({
          id: null,
          isAdmin: null
        })
      }

    })
  }, [])


  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
          <Container fluid>
              <AppNavbar/>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/products" element={<Products/>} />
                  <Route path="/products/:productId" element={<ProductView/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/addProduct" element={<AddProduct/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="*" element={<Error/>} />
              </Routes>
          </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
