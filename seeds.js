const mongoose = require('mongoose');
const db = require('./models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSeed = [
  {
    username: 'JohnDoe',
    email: 'john@example.com',
  },
  {
    username: 'JaneDoe',
    email: 'jane@example.com',
  },
  {
    username: 'SamSmith',
    email: 'sam@example.com',
  },
];

const thoughtSeed = [
  {
    text: 'This is a thought',
  },
  {
    text: 'What a beautiful day!',
  },
  {
    text: 'I need coffee',
  },
];

async function seedDB() {
  try {
    await db.User.deleteMany({});
    const users = await db.User.collection.insertMany(userSeed);

    await db.Thought.deleteMany({});
    const thoughts = await db.Thought.collection.insertMany(thoughtSeed);

    console.log('Records inserted!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();
