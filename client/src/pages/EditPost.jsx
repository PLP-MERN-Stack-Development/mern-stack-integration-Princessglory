import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import './PostForm.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePost, fetchPost, categories, fetchCategories } = usePost();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    isPublished: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    loadPost();
  }, [id]);

  const loadPost = async () => {
    const result = await fetchPost(id);
    if (result.success) {
      const post = result.data;
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        category: post.category._id,
        tags: post.tags?.join(', ') || '',
        isPublished: post.isPublished,
      });
    } else {
      setError(result.error);
    }
    setInitialLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Convert tags string to array
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    const result = await updatePost(id, postData);

    if (result.success) {
      navigate(`/posts/${id}`);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  if (initialLoading) {
    return <div className="loading">Loading post...</div>;
  }

  return (
    <div className="post-form-page">
      <div className="post-form-container">
        <h1>Edit Post</h1>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Short description (optional)"
              maxLength="200"
              style={{ minHeight: '80px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Write your post content here..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., javascript, react, tutorial"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              Published
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Post'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/posts/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
