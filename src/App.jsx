// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SpotList from './pages/SpotList';
import Favorites from './pages/Favorites';
import SpotDetail from './pages/SpotDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main style={{ padding: '1rem', maxWidth: '800px', margin: '3rem auto 2rem auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spots" element={<SpotList />} />
            <Route path="/spots/:id" element={<SpotDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
