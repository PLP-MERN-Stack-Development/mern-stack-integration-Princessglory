import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <h2 className="post-title">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h2>
        <span className="post-category">{post.category?.name}</span>
      </div>
      
      <p className="post-excerpt">
        {post.excerpt || post.content?.substring(0, 150) + '...'}
      </p>
      
      <div className="post-meta">
        <span className="post-author">By {post.author?.name}</span>
        <span className="post-date">{formatDate(post.createdAt)}</span>
        <span className="post-views">{post.viewCount} views</span>
      </div>
      
      <Link to={`/posts/${post._id}`} className="btn btn-primary">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
