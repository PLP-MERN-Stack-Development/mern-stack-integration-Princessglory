import { useState, useEffect } from 'react';
import { usePost } from '../context/PostContext';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import './Home.css';

const Home = () => {
  const { posts, loading, error, pagination, fetchPosts, categories, fetchCategories } = usePost();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 10,
    };

    if (searchTerm) {
      params.search = searchTerm;
    }

    if (selectedCategory) {
      params.category = selectedCategory;
    }

    fetchPosts(params);
  }, [currentPage, searchTerm, selectedCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Blog Posts</h1>
        <p>Explore our latest articles and stories</p>
      </div>

      <div className="filters-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
