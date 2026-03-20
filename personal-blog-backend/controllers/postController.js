// controllers/postController.js

// 1. Import the Post model we created in the models directory.
// The '../' means we go up one directory level from 'controllers' to the project root,
// and then down into the 'models' folder.
const Post = require('../models/postModel');

/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 * @access  Public (for now)
 */
const createPost = async (req, res) => {
  // All controller logic that interacts with the database should be wrapped in a try...catch block
  // to handle potential errors gracefully.
  try {
    // 2. Destructure the required fields from the request body.
    // The `req.body` object contains the JSON data sent by the client, thanks to our `express.json()` middleware.
    const { title, markdownContent, author } = req.body;

    // A simple backend validation check.
    if (!title || !markdownContent) {
      // If required fields are missing, send a 400 Bad Request status with a clear error message.
      return res.status(400).json({ message: 'Please provide a title and content for the post.' });
    }

    // 3. Use the Mongoose `create` method on our Post model.
    // This is an async operation, so we use `await`.
    // We pass an object with the data for the new post. The fields should match our Post schema.
    const newPost = await Post.create({
      title,
      markdownContent,
      author, // This will use the provided author or the default 'Admin' from our schema.
    });

    // 4. Send a success response.
    // - HTTP status 201 means "Created". It's the most appropriate status for a successful POST request.
    // - We send back a JSON object containing the newly created post document. This is useful for the client,
    //   which might want to immediately display the new post or redirect to its page.
    res.status(201).json(newPost);

  } catch (error) {
    // 5. Handle potential errors.
    // This could be a validation error from Mongoose (if the data doesn't match the schema)
    // or a database connection issue.
    // We send a 400 Bad Request status, as the error is likely due to invalid data from the client.
    console.error(error); // Log the full error to the console for debugging.
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};

// 6. Export the function.
// We wrap it in an object so we can easily add and export other functions (like getAllPosts, etc.) from this file later.
module.exports = {
  createPost,
};