import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Login from './pages/Login/Login.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header';
import LoginOrSign from './components/LoginOrSign';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderWrapper = () => {
  const location = useLocation();
  let nav;

  if (location.pathname === '/') {
    nav = <LoginOrSign />;
  } else {
    nav = (
      <div className="anchors">
        <a href="/">
          <FontAwesomeIcon icon="home" />
        </a>
      </div>
    );
  }

  return <Header nav={nav} />;
};

function App() {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sign_Up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
