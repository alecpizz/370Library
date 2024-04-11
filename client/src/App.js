import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import BookSearch from './pages/bookSearch';
import UserPage from './pages/userPage';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import Nav from 'react-bootstrap/Nav'


function App()
{
     return (
          <div>
               <Navbar className='bg-body-tertiary' expand='lg'>
                    <Container>
                         <NavbarBrand href="/"> System Home </NavbarBrand>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                         <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="me-auto">
                                   <Nav.Link href="/login"> User Login </Nav.Link>
                              </Nav>
                         </Navbar.Collapse>
                    </Container>
               </Navbar>

               <Router>
                    <Routes>
                         <Route
                              exact path="/"
                              Component={Home} />
                         <Route
                              exact path="/login"
                              Component={Login} />
                         <Route
                              path="/login"
                              Component={Login} />
                         <Route
                              exact path="/search/:bookname"
                              Component={BookSearch} />
                         <Route
                              exact path="/search"
                              Component={BookSearch} />
                         <Route
                              exact path="/user/:userid"
                              Component={UserPage} />
                    </Routes>
               </Router>
          </div>
     );
}

export default App;
