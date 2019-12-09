const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const User = mongoose.model("User");
const Cart = mongoose.model("Cart");

exports.viewCartnCheckout = (req, res) => {
  const items = JSON.parse(decodeURIComponent(req.body.cart_items))
  const display_prices = items.map((item)=>{
    return item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  });
  res.render('viewCartnCheckout', {
    items: items
  });
};

exports.calcSubTotal = async (req, res) => {
  
  let itemsInCart = await JSON.parse(req.body.items_in_cart);

  for(var i=0; i<itemsInCart.length; i++) {
    let product = await Product.findOne({
      short_description: itemsInCart[i].name
    }).populate('product_price');
    itemsInCart[i].subtotal = parseInt(itemsInCart[i].qty) * parseInt(product.product_price.current_price);
    itemsInCart[i].product = product._id;
  }

  const user = await User.findOne({
    _id: req.user.id
  });

  if(user) {
    const cart = await new Cart({
      user_id: user._id,
      user_cart: itemsInCart
    });

    await cart.save();
    res.render('checkout', {
      cart
    });
  }
};