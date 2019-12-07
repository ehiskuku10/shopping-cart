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
const Category = require('../models/Product/ProductCategory');
const Size = require('../models/Product/ProductSize');
const Brand = require('../models/Product/ProductBrand');


const privileges = JSON.parse(fs.readFileSync(__dirname + '/privileges.json', 'utf-8'));
// const categories = JSON.parse(fs.readFileSync(__dirname + '/productCategories.json', 'utf-8'));
const sizes = JSON.parse(fs.readFileSync(__dirname + '/productSizes.json', 'utf-8'));
const brands = JSON.parse(fs.readFileSync(__dirname + '/productBrands.json', 'utf-8'));


async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Privilege.remove();
  await Category.remove();
  await Size.remove();
  console.log('Data Deleted. To load seeds, run\n\n\t npm run seed\n\n');
  process.exit();
}

async function loadData() {
  try {
    const privilegesPromise = Privilege.insertMany(privileges);
    const categoriesPromise = Category.insertMany(categories)
    const sizesPromise = Size.insertMany(sizes)
    await Promise.all([privilegesPromise, categoriesPromise, sizesPromise])
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing seed data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}

async function loadData2() {
  try {
    const allBrands = await Brand.insertMany(brands);
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
  loadData2();
}
