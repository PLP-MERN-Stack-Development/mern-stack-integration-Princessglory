# MERN Stack Blog Application 📝

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. This project demonstrates seamless integration between frontend and backend with complete CRUD operations, user authentication, pagination, search, and filtering capabilities.

## 🌟 Features

### Core Features
- ✅ User authentication and authorization (JWT)
- ✅ Full CRUD operations for blog posts
- ✅ Category management
- ✅ Comments system
- ✅ Pagination for posts
- ✅ Search functionality
- ✅ Category filtering
- ✅ Protected routes
- ✅ Responsive design

### Technical Features
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- React with Context API for state management
- React Router for navigation
- JWT-based authentication
- Input validation and error handling
- Proxy configuration for development

## 📂 Project Structure

```
mern-stack-integration/
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/        # React context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── PostContext.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   │   ├── Post.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── controllers/        # Route controllers
│   │   ├── postController.js
│   │   ├── categoryController.js
│   │   └── authController.js
│   ├── routes/             # API routes
│   │   ├── posts.js
│   │   ├── categories.js
│   │   └── auth.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js           # Main server file
│   ├── .env.example        # Environment variables template
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-stack-integration-Princessglory
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog?retryWrites=true&w=majority
   ```

4. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

2. **Start the Backend Server** (in `server` directory)
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

3. **Start the Frontend** (in `client` directory, new terminal)
   ```bash
   npm run dev
   ```
   Client runs on http://localhost:5173

4. **Access the Application**
   
   Open your browser and navigate to: http://localhost:5173

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Posts
- `GET /api/posts` - Get all posts (with pagination, search, filter)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (Protected)
- `PUT /api/posts/:id` - Update post (Protected)
- `DELETE /api/posts/:id` - Delete post (Protected)
- `POST /api/posts/:id/comments` - Add comment to post (Protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Protected)
- `PUT /api/categories/:id` - Update category (Protected)
- `DELETE /api/categories/:id` - Delete category (Protected)

### Query Parameters for GET /api/posts
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search term for title/content
- `category` - Filter by category ID
- `published` - Filter by published status

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login** to receive a token
2. **Token is stored** in localStorage
3. **Protected routes** require valid token in Authorization header
4. **Token format**: `Bearer <token>`

## 💾 Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin']),
  avatar: String,
  timestamps: true
}
```

### Post Schema
```javascript
{
  title: String (required, max: 100),
  content: String (required),
  excerpt: String (max: 200),
  slug: String (auto-generated),
  author: ObjectId (ref: User),
  category: ObjectId (ref: Category),
  tags: [String],
  isPublished: Boolean,
  viewCount: Number,
  comments: [{
    user: ObjectId (ref: User),
    content: String,
    createdAt: Date
  }],
  timestamps: true
}
```

### Category Schema
```javascript
{
  name: String (required, unique, max: 50),
  description: String (max: 200),
  slug: String (auto-generated),
  timestamps: true
}
```

## 🧪 Testing the Application

### Create Sample Data

1. **Register a User**
   - Navigate to Register page
   - Create account with name, email, password

2. **Create Categories** (using API tool like Postman or Thunder Client)
   ```json
   POST /api/categories
   {
     "name": "Technology",
     "description": "Tech related posts"
   }
   ```

3. **Create a Post**
   - Login with your account
   - Click "Create Post"
   - Fill in title, content, select category
   - Click "Create Post"

4. **Test Features**
   - ✅ View all posts with pagination
   - ✅ Search posts
   - ✅ Filter by category
   - ✅ View post details
   - ✅ Add comments
   - ✅ Edit/Delete your posts

## 🎨 Frontend Technologies

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## 🛠️ Backend Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📝 Development Notes

### Key Implementation Details

1. **Authentication Flow**
   - JWT tokens stored in localStorage
   - AuthContext provides user state globally
   - ProtectedRoute component guards private routes
   - Token automatically added to API requests

2. **State Management**
   - AuthContext for user authentication
   - PostContext for posts and categories
   - Custom hooks for reusable logic

3. **API Integration**
   - Axios instance with interceptors
   - Centralized API service
   - Error handling and loading states

4. **Pagination**
   - Backend: MongoDB skip/limit
   - Frontend: Pagination component
   - Page state management

## 🚧 Common Issues & Solutions

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env
   - For Atlas: Check network access and credentials

2. **CORS Errors**
   - Verify CLIENT_URL in server .env
   - Check proxy configuration in vite.config.js

3. **Authentication Issues**
   - Clear localStorage
   - Check JWT_SECRET consistency
   - Verify token format in requests

## 📦 Dependencies

### Server
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.2",
  "bcryptjs": "^3.0.2",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express-validator": "^7.3.0"
}
```

### Client
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.9.5",
  "axios": "^1.13.1",
  "vite": "^7.1.12"
}
```

## 👨‍💻 Author

**Glory** - PLP MERN Stack Development Course

## 📄 License

This project is created for educational purposes as part of the PLP MERN Stack Development Course.

## 🙏 Acknowledgments

- PLP Academy for the course structure
- MongoDB documentation
- React documentation
- Express.js documentation

---

**Note**: This is a learning project demonstrating MERN stack integration. For production use, additional security measures, testing, and optimization would be required.
