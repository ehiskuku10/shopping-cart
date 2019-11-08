require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import models you need to seed - they need to be imported only once
const Privilege = require('../models/Privilege');


const privileges = JSON.parse(fs.readFileSync(__dirname + '/privileges.json', 'utf-8'));


async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Privilege.remove();
  console.log('Data Deleted. To load seeds, run\n\n\t npm run seed\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Privilege.insertMany(privileges);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing seed data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
