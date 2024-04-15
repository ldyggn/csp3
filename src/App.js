import './App.css';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import ProductsCatalog from './pages/ProductsCatalog';
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Account from './pages/Account';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import ResetPassword from './pages/ResetPassword';
import UpdateProfile from './pages/UpdateProfile';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (typeof data.user !== 'undefined') {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsCatalog />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/account" element={<Account />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderHistory />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer /> 
        </Container>

      </Router>
    </UserProvider>
  );
}

export default App;
