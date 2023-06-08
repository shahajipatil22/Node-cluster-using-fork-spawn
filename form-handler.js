const mongoose = require('mongoose');
const SampleModel = require('./models/sample');

// Connect to MongoDB
mongoose.connect('mongodb+srv://mailboxshawtc:<password>@mumbai-cluster.i61y3qs.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB in child process');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB in child process:', error);
  });

// Handle the form submission
const [name, description] = process.argv.slice(2);

const sample = new SampleModel({
  name,
  description,
});

sample.save()
  .then(() => {
    console.log('Form submitted successfully in child process');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error submitting form in child process:', error);
    process.exit(1);
  });
