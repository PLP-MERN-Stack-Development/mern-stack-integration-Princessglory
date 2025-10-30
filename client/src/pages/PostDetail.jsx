import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPost, deletePost, addComment } = usePost();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    const result = await fetchPost(id);
    if (result.success) {
      setPost(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const result = await deletePost(id);
      if (result.success) {
        navigate('/');
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setCommentLoading(true);
    const result = await addComment(id, comment);
    if (result.success) {
      setComment('');
      loadPost(); // Reload post to get updated comments
    }
    setCommentLoading(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error || !post) {
    return <div className="error">{error || 'Post not found'}</div>;
  }

  const isAuthor = user && post.author._id === user.id;

  return (
    <div className="post-detail-page">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">By {post.author.name}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
          <span className="post-category">{post.category.name}</span>
          <span className="post-views">{post.viewCount} views</span>
        </div>
      </div>

      <div className="post-content">
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {isAuthor && (
        <div className="post-actions">
          <Link to={`/edit-post/${post._id}`} className="btn btn-primary">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Post
          </button>
        </div>
      )}

      <div className="comments-section">
        <h2>Comments ({post.comments?.length || 0})</h2>

        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <button type="submit" className="btn btn-primary" disabled={commentLoading}>
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        )}

        <div className="comments-list">
          {post.comments?.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.user?.name}</span>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
