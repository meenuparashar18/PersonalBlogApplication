// // // controllers/postController.js

// // // 1. Import the Post model we created in the models directory.
// // // The '../' means we go up one directory level from 'controllers' to the project root,
// // // and then down into the 'models' folder.
// // const Post = require('../models/postModel');

// // /**
// //  * @desc    Create a new blog post
// //  * @route   POST /api/posts
// //  * @access  Public (for now)
// //  */
// // const createPost = async (req, res) => {
// //   // All controller logic that interacts with the database should be wrapped in a try...catch block
// //   // to handle potential errors gracefully.
// //   try {
// //     // 2. Destructure the required fields from the request body.
// //     // The `req.body` object contains the JSON data sent by the client, thanks to our `express.json()` middleware.
// //     const { title, markdownContent, author } = req.body;

// //     // A simple backend validation check.
// //     if (!title || !markdownContent) {
// //       // If required fields are missing, send a 400 Bad Request status with a clear error message.
// //       return res.status(400).json({ message: 'Please provide a title and content for the post.' });
// //     }

// //     // 3. Use the Mongoose `create` method on our Post model.
// //     // This is an async operation, so we use `await`.
// //     // We pass an object with the data for the new post. The fields should match our Post schema.
// //     const newPost = await Post.create({
// //       title,
// //       markdownContent,
// //       author, // This will use the provided author or the default 'Admin' from our schema.
// //     });

// //     // 4. Send a success response.
// //     // - HTTP status 201 means "Created". It's the most appropriate status for a successful POST request.
// //     // - We send back a JSON object containing the newly created post document. This is useful for the client,
// //     //   which might want to immediately display the new post or redirect to its page.
// //     res.status(201).json(newPost);

// //   } catch (error) {
// //     // 5. Handle potential errors.
// //     // This could be a validation error from Mongoose (if the data doesn't match the schema)
// //     // or a database connection issue.
// //     // We send a 400 Bad Request status, as the error is likely due to invalid data from the client.
// //     console.error(error); // Log the full error to the console for debugging.
// //     res.status(400).json({ message: 'Error creating post', error: error.message });
// //   }
// // };

// // // 6. Export the function.
// // // We wrap it in an object so we can easily add and export other functions (like getAllPosts, etc.) from this file later.
// // module.exports = {
// //   createPost,
// // };


// // controllers/postController.js

// const Post = require('../models/postModel');

// /**
//  * @desc    Create a new blog post
//  * @route   POST /api/posts
//  * @access  Public (for now)
//  */
// const createPost = async (req, res) => {
//   try {
//     const { title, markdownContent, author } = req.body;

//     if (!title || !markdownContent) {
//       return res.status(400).json({ message: 'Please provide a title and content for the post.' });
//     }

//     const newPost = await Post.create({
//       title,
//       markdownContent,
//       author,
//     });

//     res.status(201).json(newPost);

//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: 'Error creating post', error: error.message });
//   }
// };

// // --- NEW FUNCTION STARTS HERE ---

// /**
//  * @desc    Get all blog posts
//  * @route   GET /api/posts
//  * @access  Public
//  */
// const getAllPosts = async (req, res) => {
//   try {
//     // 1. Use the Post model's find() method to retrieve all documents.
//     // The empty object {} as the first argument means "match all documents".
//     // We then chain the sort() method to organize the results.
//     // { createdAt: -1 } sorts the posts by their creation date in descending order (newest first).
//     const posts = await Post.find({}).sort({ createdAt: -1 });

//     // 2. Send a success response.
//     // - HTTP status 200 means "OK". It's the standard success code for a GET request.
//     // - We send back a JSON object containing the array of posts we found.
//     //   If no posts are found, this will correctly return an empty array [].
//     res.status(200).json(posts);

//   } catch (error) {
//     // 3. Handle potential server-side errors.
//     // If something goes wrong with the database query, it's a server error, not a client error.
//     // Therefore, we use the HTTP status 500 "Internal Server Error".
//     console.error(error); // Log the error for debugging.
//     res.status(500).json({ message: 'Error fetching posts', error: error.message });
//   }
// };

// // --- NEW FUNCTION ENDS HERE ---

// // We now add getAllPosts to the exports object.
// module.exports = {
//   createPost,
//   getAllPosts, // <-- Add the new function here
// };



// controllers/postController.js

const Post = require('../models/postModel');

/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 * @access  Public (for now)
 */
const createPost = async (req, res) => {
  // ... (existing code for createPost)
  try {
    const { title, markdownContent, author } = req.body;

    if (!title || !markdownContent) {
      return res.status(400).json({ message: 'Please provide a title and content for the post.' });
    }

    const newPost = await Post.create({
      title,
      markdownContent,
      author,
    });

    res.status(201).json(newPost);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};

/**
 * @desc    Get all blog posts
 * @route   GET /api/posts
 * @access  Public
 */
const getAllPosts = async (req, res) => {
  // ... (existing code for getAllPosts)
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// --- NEW FUNCTION STARTS HERE ---

/**
 * @desc    Get a single blog post by its ID
 * @route   GET /api/posts/:id
 * @access  Public
 */
const getPostById = async (req, res) => {
  try {
    // 1. Find the post in the database using the ID from the URL parameter.
    // The `req.params.id` is automatically populated by Express from the route (e.g., /api/posts/some_id_value).
    const post = await Post.findById(req.params.id);

    // 2. Check if a post was actually found.
    if (post) {
      // If the post exists, send a 200 OK status with the post data.
      res.status(200).json(post);
    } else {
      // If post is null (meaning no document with that ID was found),
      // it's not a server error, but a client error (they requested a non-existent resource).
      // The correct response is a 404 Not Found.
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    // 3. Handle potential errors.
    console.error(error); // Log the full error for debugging.
    
    // A common error here is a `CastError` from Mongoose, which occurs if the provided ID
    // is not in a valid ObjectId format. This is a client-side error (bad request).
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `Invalid post ID format: ${req.params.id}` });
    }

    // For all other types of errors (e.g., database connection issues),
    // we send a 500 Internal Server Error.
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

// --- NEW FUNCTION ENDS HERE ---

// Update the exports to include the new function
module.exports = {
  createPost,
  getAllPosts,
  getPostById, // <-- Add the new function here
};