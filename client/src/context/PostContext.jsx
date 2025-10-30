import { createContext, useState, useContext } from 'react';
import { postsAPI, categoriesAPI } from '../services/api';

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  // Fetch all posts with pagination and filters
  const fetchPosts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsAPI.getPosts(params);
      setPosts(response.data.data);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total,
      });
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch posts';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Fetch single post
  const fetchPost = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsAPI.getPost(id);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch post';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Create post
  const createPost = async (postData) => {
    try {
      setError(null);
      const response = await postsAPI.createPost(postData);
      setPosts([response.data.data, ...posts]);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create post';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Update post
  const updatePost = async (id, postData) => {
    try {
      setError(null);
      const response = await postsAPI.updatePost(id, postData);
      setPosts(posts.map((post) => (post._id === id ? response.data.data : post)));
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update post';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Delete post
  const deletePost = async (id) => {
    try {
      setError(null);
      await postsAPI.deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete post';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.data.data);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch categories';
      return { success: false, error: message };
    }
  };

  // Add comment
  const addComment = async (postId, content) => {
    try {
      setError(null);
      const response = await postsAPI.addComment(postId, { content });
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to add comment';
      setError(message);
      return { success: false, error: message };
    }
  };

  const value = {
    posts,
    categories,
    loading,
    error,
    pagination,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    fetchCategories,
    addComment,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContext;
