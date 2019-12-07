exports.viewCartnCheckout = (req, res) => {
  const items = JSON.parse(decodeURIComponent(req.body.cart_items))
  const display_prices = items.map((item)=>{
    return item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  })
  res.render('viewCartnCheckout', {
    items: items
  })
}