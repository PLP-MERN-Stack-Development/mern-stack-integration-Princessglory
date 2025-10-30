# 🧪 MERN Blog Application - Testing Guide

## ✅ Testing Checklist

### Phase 1: User Authentication Testing

#### 1.1 Register a New User
- [ ] Open http://localhost:5173
- [ ] Click on **Register** in the navigation
- [ ] Fill in the registration form:
  - Name: `Test User`
  - Email: `test@example.com`
  - Password: `password123`
- [ ] Click **Register** button
- [ ] **Expected**: Redirected to home page, logged in automatically

#### 1.2 Logout
- [ ] Click **Logout** button in navigation
- [ ] **Expected**: Logged out, redirected to login page

#### 1.3 Login
- [ ] Click **Login** in navigation
- [ ] Enter credentials:
  - Email: `test@example.com`
  - Password: `password123`
- [ ] Click **Login**
- [ ] **Expected**: Successfully logged in, see "Create Post" link

---

### Phase 2: Create Categories (Using API)

Since categories can only be created via API, we'll use PowerShell:

#### 2.1 Get Authentication Token
```powershell
# Login and save the token
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"test@example.com","password":"password123"}'
$token = $response.token
Write-Host "Token: $token"
```

#### 2.2 Create Categories
```powershell
# Create Technology category
Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"name":"Technology","description":"Tech related posts"}'

# Create Lifestyle category
Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"name":"Lifestyle","description":"Lifestyle and wellness"}'

# Create Travel category
Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"name":"Travel","description":"Travel adventures"}'

# Create Food category
Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"name":"Food","description":"Recipes and food reviews"}'
```

#### 2.3 Verify Categories
```powershell
# List all categories
Invoke-RestMethod -Uri "http://localhost:5000/api/categories" -Method GET
```

---

### Phase 3: Blog Post Management

#### 3.1 Create First Post
- [ ] Make sure you're logged in
- [ ] Click **Create Post** in navigation
- [ ] Fill in the form:
  - **Title**: `Getting Started with MERN Stack`
  - **Content**: 
    ```
    The MERN stack is a popular web development framework that consists of MongoDB, Express.js, React, and Node.js. 
    
    In this post, we'll explore why MERN is such a powerful combination for building modern web applications.
    
    ## Why MERN?
    
    1. **JavaScript Everywhere** - Use one language for both frontend and backend
    2. **Fast Development** - Reusable components and rapid prototyping
    3. **Scalability** - Built to handle growing applications
    4. **Community Support** - Large ecosystem and plenty of resources
    ```
  - **Excerpt**: `An introduction to the MERN stack and why it's great for web development`
  - **Category**: Select `Technology`
  - **Tags**: `mern, javascript, web development, tutorial`
  - **Published**: ✅ Check the box
- [ ] Click **Create Post**
- [ ] **Expected**: Redirected to home page, see your new post

#### 3.2 Create More Posts
Repeat the process to create 2-3 more posts with different categories:

**Post 2:**
- Title: `10 Tips for Better Sleep`
- Category: `Lifestyle`
- Tags: `health, wellness, sleep`

**Post 3:**
- Title: `Best Coffee Shops in Seattle`
- Category: `Food`
- Tags: `coffee, seattle, food`

**Post 4:**
- Title: `My Trip to Tokyo`
- Category: `Travel`
- Tags: `japan, tokyo, travel`

---

### Phase 4: Post Interaction Testing

#### 4.1 View Post Details
- [ ] Click on any post card from the home page
- [ ] **Expected**: See full post content with all details
- [ ] **Verify**: 
  - Title displays correctly
  - Full content is visible
  - Category badge shows
  - Tags are displayed
  - View count shows
  - Author name appears

#### 4.2 Add Comments
- [ ] On a post detail page (while logged in)
- [ ] Scroll to the comments section
- [ ] Enter a comment: `Great post! Very informative.`
- [ ] Click **Add Comment**
- [ ] **Expected**: Comment appears below the post
- [ ] Add another comment to test multiple comments

#### 4.3 Edit Your Post
- [ ] Go to one of your posts
- [ ] Click **Edit** button (only visible if you're the author)
- [ ] Modify the title or content
- [ ] Click **Update Post**
- [ ] **Expected**: Post updated, see changes reflected

#### 4.4 Delete a Post
- [ ] Go to one of your posts
- [ ] Click **Delete** button
- [ ] Confirm deletion
- [ ] **Expected**: Post removed, redirected to home page

---

### Phase 5: Search and Filter Testing

#### 5.1 Test Search Functionality
- [ ] On the home page, locate the search box
- [ ] Type a keyword (e.g., `MERN`)
- [ ] **Expected**: Only posts containing that keyword are displayed
- [ ] Clear search
- [ ] **Expected**: All posts appear again

#### 5.2 Test Category Filter
- [ ] Click on the category dropdown
- [ ] Select `Technology`
- [ ] **Expected**: Only Technology posts are shown
- [ ] Select `All Categories`
- [ ] **Expected**: All posts appear again

#### 5.3 Test Combined Search + Filter
- [ ] Select a category (e.g., `Travel`)
- [ ] Type a search term (e.g., `Tokyo`)
- [ ] **Expected**: Posts matching BOTH criteria are shown

---

### Phase 6: Pagination Testing

#### 6.1 Test Pagination
If you have more than 6 posts:
- [ ] Scroll to bottom of home page
- [ ] Click **Next** button
- [ ] **Expected**: See next set of posts
- [ ] Click **Previous** button
- [ ] **Expected**: Return to previous page
- [ ] Click on a specific page number
- [ ] **Expected**: Jump to that page

---

### Phase 7: Protected Routes Testing

#### 7.1 Test Access Control
- [ ] While logged OUT:
  - [ ] Try to access http://localhost:5173/posts/create
  - [ ] **Expected**: Redirected to login page
  - [ ] Login again
  - [ ] **Expected**: Can now access Create Post page

#### 7.2 Test Edit Protection
- [ ] Register a second user account
- [ ] Try to edit a post created by the first user
- [ ] **Expected**: Edit/Delete buttons should NOT appear (author check)

---

### Phase 8: API Endpoint Testing (Optional)

Test backend endpoints directly using PowerShell:

```powershell
# Get all posts
Invoke-RestMethod -Uri "http://localhost:5000/api/posts" -Method GET

# Get posts with pagination
Invoke-RestMethod -Uri "http://localhost:5000/api/posts?page=1&limit=5" -Method GET

# Search posts
Invoke-RestMethod -Uri "http://localhost:5000/api/posts?search=MERN" -Method GET

# Filter by category (replace CATEGORY_ID with actual ID)
Invoke-RestMethod -Uri "http://localhost:5000/api/posts?category=CATEGORY_ID" -Method GET

# Get single post (replace POST_ID with actual ID)
Invoke-RestMethod -Uri "http://localhost:5000/api/posts/POST_ID" -Method GET
```

---

## 🐛 Common Issues & Solutions

### Issue: Can't see categories in dropdown
**Solution**: Make sure you created categories using the API commands in Phase 2

### Issue: Posts not appearing
**Solution**: 
1. Check if posts are marked as "Published"
2. Check browser console for errors (F12)
3. Verify backend is running on port 5000

### Issue: Can't login
**Solution**: 
1. Verify MongoDB is running (`mongod` in terminal)
2. Check backend console for errors
3. Ensure email/password are correct

### Issue: Comments not appearing
**Solution**: 
1. Refresh the page
2. Check if you're logged in
3. Verify backend console for errors

---

## 📸 Screenshots Checklist (For Submission)

Take screenshots of:
- [ ] Home page with multiple posts
- [ ] Post detail page with comments
- [ ] Create post page
- [ ] Edit post page
- [ ] Search results
- [ ] Category filter in action
- [ ] Pagination working
- [ ] Login/Register pages
- [ ] Backend terminal showing "Connected to MongoDB"
- [ ] Frontend terminal showing Vite running

---

## ✅ Final Verification

Before submitting:
- [ ] All features work without errors
- [ ] Code is pushed to GitHub
- [ ] README.md is complete
- [ ] No console errors in browser (F12 > Console)
- [ ] Backend shows no errors
- [ ] MongoDB is connected successfully

---

## 🎯 Testing Summary

Mark when complete:
- [ ] Authentication (Register, Login, Logout)
- [ ] Create Categories via API
- [ ] Create Posts
- [ ] View Post Details
- [ ] Add Comments
- [ ] Edit Posts
- [ ] Delete Posts
- [ ] Search Posts
- [ ] Filter by Category
- [ ] Pagination
- [ ] Protected Routes

---

**Great job! Your MERN application is ready for submission! 🎉**
