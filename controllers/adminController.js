const Product = require('../models/Product/Product')
const ProductPrice = require('../models/Product/ProductPrice')
const ProductCategory = require('../models/Product/ProductCategory')
const ProductSize = require('../models/Product/ProductSize')
const ProductBrand = require('../models/Product/ProductBrand')
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

exports.upload = multer(multerOptions).array('image', 3);

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.files) {
    next(); // skip to the next middleware
    return;
  }
  req.body.image = [];
  for(var i=0; i<req.files.length; i++) {
    const extension = req.files[i].mimetype.split('/')[1];
  
    req.body.image[i] = `${uuid.v4()}.${extension}`;
    // let's resize the image
    const image = await jimp.read(req.files[i].buffer);
    await image.resize(800, jimp.AUTO);
    await image.write(`./public/uploads/${req.body.image[i]}`);
  }
  console.log(req.body.image)
  // once we have written the photo to our filesystem, keep going!
  next();
};

exports.addProduct = async (req, res) => {
  const sizesPromise = ProductSize.find()
  const categoriesPromise = ProductCategory.find()
  const brandsPromise = ProductBrand.find()
  const [sizes, categories, brands] = await Promise.all([sizesPromise, categoriesPromise, brandsPromise])
  res.render('admin/editProduct', { 
    title: 'Add Product',
    sizes,
    categories,
    brands
  });
};


exports.createProduct = async (req, res) => {

  const productPrice = await new ProductPrice({
    current_price: req.body.current_price,
    product_discount: req.body.discount
  }).save()

  const productCount = await Product.countDocuments()
  const product = await new Product({
    short_description: req.body.short_description,
    description: req.body.description,
    product_image: req.body.image,
    tags: req.body.tags,
    gender: !!req.body.gender,
    brand: req.body.brand,
    product_price: productPrice._id,
    product_size: req.body.size === "none" ? "5dce600616301e226cf2eaaa" : req.body.size,
    category: req.body.category,
    forecast_no: parseInt(productCount) + 1,
    // product_price: req.body.price,
    product_in_stock_count: req.body.product_in_stock_count
  }).save()

  // const productPrice = await new ProductPrice({
  //   product_discount: req.body.product_discount,
  //   Product_price: req.body.product_price,
  //   product: product._id
  // }).save()
  
  req.flash('success', `Successfully Created Product`);
  res.redirect('back')
};

exports.getDashboard = (req, res) => {
  res.render('admin/dashboard')
}