const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ProductSize = mongoose.model('ProductSize')
const User = mongoose.model('User')

exports.showCase = async (req, res) => {

  // const topSellingItems = await Product
  //   .find()
  //   .limit(5)
  //   .sort({items_sold: 'desc'})

  const menShoes = await Product
    .find({category: "5dce600616301e226cf2eb49"})
    .limit(5)
    .sort({items_sold: 'desc'})
  
  let selector = []
  const productCount = await Product.countDocuments()

  for(let i=0; i<=5; i++) {
    let rand = Math.random()
    const randNum = Math.floor(rand * productCount)
    selector.push(randNum)
  }

  const dailyDeals = await Product.find({
    forecast_no: {$in: selector }
  })

  res.render('home', {
    title: "Home",
    menShoes,
    dailyDeals
  })
}

exports.getOneProduct = async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id
  }, {_id: 0}).populate('product_price product_size')

  const sizes = await ProductSize.find({
    category: product.product_size.category
  })

  return res.render('product', {
    title: product.short_description,
    product,
    price: product.product_price.current_price,
    oddprice: '1000000'.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
    sizes
  })
}