const express = require('express');
const mongoose = require('mongoose');
const { spawn } = require('child_process');

// Create the Express app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a sample model
const SampleModel = mongoose.model('Sample', {
  name: String,
  description: String,
});

// Define routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Sample Form</h1>
    <form action="/samples" method="post">
      <input type="text" name="name" placeholder="Name" required /><br />
      <textarea name="description" placeholder="Description" required></textarea><br />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/samples', async (req, res) => {
  try {
    const { name, description } = req.body;

    // Spawn a child process to handle the form submission
    const childProcess = spawn('node', ['form-handler.js', name, description]);

    childProcess.on('error', (error) => {
      console.error('Error in child process:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    childProcess.on('exit', (code, signal) => {
      console.log('Child process exited with code:', code, 'and signal:', signal);
      res.send('Form submitted successfully');
    });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = 3007;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
