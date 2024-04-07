import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import BookSearch from './pages/bookSearch';
import UserPage from './pages/userPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          Component = {Home} />
          <Route
          exact path="/login"
          Component = {Login} />
           <Route
          exact path="/search/:bookname"
          Component = {BookSearch} />
           <Route
          exact path="/search"
          Component = {BookSearch} />
          <Route
          exact path="/user/:userid"
          Component = {UserPage} />
      </Routes>
    </Router>
  );
}

export default App;
