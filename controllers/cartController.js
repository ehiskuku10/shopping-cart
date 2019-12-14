const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const User = mongoose.model("User");
const Cart = mongoose.model("Cart");

exports.viewCartnCheckout = async (req, res) => {
  const cart = await Cart.findOne({
    user_id: req.user._id,
    isDeleted: false
  });
  const items = JSON.parse(decodeURIComponent(req.body.cart_items));
  if(cart) {
    let newCart = [];
    for(var i=0; i<items.length; i++) {
      let product_item = await Product.findOne({
        short_description: items[i].name
      });

      newItem = {
        name: items[i].name,
        size: items[i].size,
        price: items[i].price,
        product: product_item._id
      }
      newCart.push(newItem);
    }
    cart.user_cart = newCart;
    await cart.save();
    console.log(cart);
  } else {
      let newCart = [];

      for(var i=0; i<items.length; i++) {
        let product_item = await Product.findOne({
          short_description: items[i].name
        });

        let newItem = {
          name: items[i].name,
          size: items[i].size,
          price: parseInt(items[i].price),
          product: product_item._id
        };
        newCart.push(newItem);
      }

      const cart = await new Cart({
        user_id: req.user._id,
        user_cart: newCart
      });
      await cart.save();
      console.log(newCart);
    }
  // const display_prices = items.map((item)=>{
  //   return item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // });
  // res.render('viewCartnCheckout', {
  //   cart: cart
  // });
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
    const cart = await Cart.find({
      user_id: user._id,
      isDeleted: false
    }, {user_id: 0});
    if(cart) {
      cart.user_cart = itemsInCart
    } else {
      const cart = await new Cart({
        user_id: user._id,
        user_cart: itemsInCart
      });
    }
          
    await cart.save();
    res.render('checkout', {
      cart
    });
  }
};