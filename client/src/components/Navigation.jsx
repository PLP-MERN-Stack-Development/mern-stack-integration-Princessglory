import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            <h1>MERN Blog</h1>
          </Link>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/create-post" className="nav-link">
                  Create Post
                </Link>
                <span className="nav-user">
                  Welcome, {user?.name}
                </span>
                <button onClick={logout} className="nav-link btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
