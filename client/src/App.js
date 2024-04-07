import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/home';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          Component = {Home} />
      </Routes>
    </Router>
  );
}

export default App;
