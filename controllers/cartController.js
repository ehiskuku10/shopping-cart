const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const User = mongoose.model("User");
const Cart = mongoose.model("Cart");

const addToCart = async (items) => {
  let newCart = [];
  for(var i=0; i<items.length; i++) {
    let product_item = await Product.findOne({
      short_description: items[i].name
    }).populate("product_price");

    newItem = {
      name: items[i].name,
      size: items[i].size,
      price: parseInt(product_item.product_price.current_price),
      imgURL: items[i].imgURL,
      qty: items[i].qty || 1,
      subtotal: items[i].subtotal || parseInt(product_item.product_price.current_price)
    }
    newCart.push(newItem);
  }
  return newCart;
}

exports.viewCartnCheckout = async (req, res) => {
  const cart = await Cart.findOne({
    user_id: req.user._id,
    isDeleted: false
  });
  const items = JSON.parse(decodeURIComponent(req.body.cart_items));
  if(cart) {
    cart.user_cart = await addToCart(items);
    await cart.save();

    let goCart = [];
    for(var j=0; j<cart.user_cart.length; j++) {
      let {price, qty, subtotal, name, imgURL, size} = cart.user_cart[j];
      goCart.push({price, qty, subtotal, name, imgURL, size});
    }

    res.render('viewCartnCheckout', {
      goCart
    });
  } else {
      const cart = await new Cart({
        user_id: req.user._id,
        user_cart: await addToCart(items)
      }).save();

      let goCart = [];
      for(var j=0; j<cart.user_cart.length; j++) {
        let {price, qty, subtotal, name, imgURL, size} = cart.user_cart[j];
        goCart.push({price, qty, subtotal, name, imgURL, size});
      }

      res.render('viewCartnCheckout', {
        goCart
      });
    }
};

exports.calcSubTotal = async (req, res) => {
  let itemsInCart = await JSON.parse(decodeURIComponent(req.body.items_in_cart));
  var total = 0;
  var newItemsInCart =[];
  for(var i=0; i<itemsInCart.length; i++) {
    const product = await Product.findOne({
      short_description: itemsInCart[i].name
    }).populate('product_price');
    console.log(product);
    itemsInCart[i].price = product.product_price.current_price;
    itemsInCart[i].subtotal = itemsInCart[i].price * itemsInCart[i].qty;
    total = total + itemsInCart[i].subtotal;
    newItemsInCart.push(itemsInCart[i]);
  }

  const cart = await Cart.findOne({
    user_id: req.user._id,
    isDeleted: false
  })
  cart.user_cart = newItemsInCart;
  await cart.save();

  console.log(total + '\n');
  console.log(cart);
  res.render('checkout', {
    indicant: 3
  });
};