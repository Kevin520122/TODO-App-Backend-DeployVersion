// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// require('dotenv').config();

// // Initialize Express
// const app = express();

// // Connect to Database
// connectDB();

// // Middleware

// app.use(cors(
// {
//   origin: ['https://todo-app-digital-factory-git-main-kevinzhaos-projects-c96a4fb1.vercel.app', 'http://localhost:3001'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }
// ))
// // app.use(cors());

// app.use(express.json({ extended: false }));

// // Define Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/tasks', require('./routes/tasks'));

// // Basic route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the Todo API' });
// });

// // Define port
// const PORT = process.env.PORT || 5000;

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI environment variable is required');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is required');
  process.exit(1);
}

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// CORS Middleware with flexible configuration
app.use(cors({
    origin: ['https://todo-app-digital-factory-git-main-kevinzhaos-projects-c96a4fb1.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Body parser middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Todo API',
    status: 'Online',
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ 
    message: err.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`));

// For graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
  });
});