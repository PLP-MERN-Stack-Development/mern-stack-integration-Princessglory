import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/create-post"
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-post/:id"
                  element={
                    <ProtectedRoute>
                      <EditPost />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
