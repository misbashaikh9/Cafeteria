import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    navigate("/signin");
  };

  const styles = {
    nav: {
      backgroundColor: '#3b2f2f',
      color: 'white',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
    },
    logo: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
    },
    brandText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#d6a96d',
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
    },
    login: {
      backgroundColor: '#d6a96d',
      color: '#3b2f2f',
      padding: '6px 16px',
      borderRadius: '9999px',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '14px',
    },
    user: {
      fontWeight: 500,
      color: '#d6a96d',
      fontSize: '15px',
    },
    logoutBtn: {
      backgroundColor: '#d6a96d',
      color: '#3b2f2f',
      padding: '6px 16px',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
    },
    hamburger: {
      background: 'transparent',
      border: 'none',
      color: '#d6a96d',
      fontSize: '24px',
      cursor: 'pointer',
    },
    mobileMenu: {
      backgroundColor: '#4a3a3a',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
  };

  const renderAuth = () => {
    return username ? (
      <div style={styles.links}>
        <span style={styles.user}>Hi, {username.split(" ")[0]}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    ) : (
      <Link to="/signin" style={styles.login}>Login</Link>
    );
  };

  return (
    <header>
      <nav style={styles.nav}>
        <Link to="/" style={styles.brandContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
            alt="logo"
            style={styles.logo}
          />
          <span style={styles.brandText}>Brew Haven</span>
        </Link>

        {!isMobile && (
          <div style={styles.links}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/coffee" style={styles.link}>Coffee</Link>
            <Link to="/bakery" style={styles.link}>Bakery</Link>
            <Link to="/shop" style={styles.link}>Shop</Link>
            <Link to="/about" style={styles.link}>About</Link>
            {renderAuth()}
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
            {menuOpen ? '✖' : '☰'}
          </button>
        )}
      </nav>

      {menuOpen && isMobile && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/coffee" style={styles.link}>Coffee</Link>
          <Link to="/bakery" style={styles.link}>Bakery</Link>
          <Link to="/shop" style={styles.link}>Shop</Link>
          <Link to="/about" style={styles.link}>About</Link>
          {username ? (
            <>
              <span style={styles.user}>Hi, {username.split(" ")[0]}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <Link to="/signin" style={styles.login}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
