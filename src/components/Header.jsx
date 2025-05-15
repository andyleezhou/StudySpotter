// src/components/Header.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>StudySpotter</h1>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
        >
          Home
        </Link>
        <Link
          to="/spots"
          className={`${styles.link} ${location.pathname === '/spots' ? styles.active : ''}`}
        >
          Spots
        </Link>
        <Link
          to="/favorites"
          className={`${styles.link} ${location.pathname === '/favorites' ? styles.active : ''}`}
        >
          Favorites
        </Link>
        {!userId ? (
          <>
            <Link
              to="/login"
              className={`${styles.link} ${location.pathname === '/login' ? styles.active : ''}`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`${styles.link} ${location.pathname === '/signup' ? styles.active : ''}`}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none' }}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
