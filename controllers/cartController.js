const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.viewCartnCheckout = (req, res) => {
  const items = JSON.parse(decodeURIComponent(req.body.cart_items))
  const display_prices = items.map((item)=>{
    return item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  });
  res.render('viewCartnCheckout', {
    items: items
  });
};

exports.viewCheckout = async (req, res) => {
  let itemsInCart = req.body.items_in_cart;
  let x = [];
  for(var i=0; i<itemsInCart.length; i++) {
    let product = await Product.findOne({
      short_description: itemsInCart[i].name
    }).populate('product_price');
    x.push(product);
  }

  res.send({
    say: x
  });
};