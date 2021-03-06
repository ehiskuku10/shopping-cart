(function($) {
  $.Shop = function(element) {
    this.$element = $(element);
    this.init();
  }

  $.Shop.prototype = {
    init: function() {

      // Properties
      this.cartPrefix = "Shopping-";
      this.cartName = this.cartPrefix + "cart";
      this.total_items = "Total_items";
      this.storage = sessionStorage;

      // DOM Elements
      this.$numItemsInCart = this.$element.find('#numItemsInCart');
      this.$cartItemsCounter = this.$element.find('#layout__cart-items-counter');
      this.$qtyList = this.$element.find('.qty-list');
      this.$currentPrice = this.$element.find('.current-price');
      this.$oldPrice = this.$element.find('.old-price');
      this.$priceDiff = this.$element.find('.price-diff');
      this.$qty = this.$element.find('.qty');
      this.$subTotal = this.$element.find('.sub-total');
      this.$vCartCheckout = this.$element.find('#vcart-checkout');
      this.$vCartTr = this.$element.find('.vcart__tr');
      this.$tether = this.$element.find('#tether');
      
      // Higher Order Declarations

      const self = this;
      self._updateStore(self.$tether.data('items'));
      let cartCopy = self._toJSONObject(self.storage.getItem(self.cartName));
      let items = cartCopy.items;
      console.log(items)
      let Titems = self._convertString(self.storage.getItem(self.total_items));
      
      
      self.$vCartCheckout.click(function(e) {
        var items_in_cart = [];
        self.$vCartTr.each(function(index, elem) {
          if(index > 0) {
            var name = $(elem).find(".vcart__item-name").data("name");
            var size = $(elem).find(".vcart__item-size").data("size");
            var imgURL = $(elem).find(".vcart__item-name").data("image");
            var qty = $(elem).find('.figure-head').children('span').text();
            items_in_cart.push({name, size, qty, imgURL});
          }
        });
        $(`<form method='post' action='/cart/calculate-subtotal'>
            <input type='hidden' name='items_in_cart' value='${JSON.stringify(items_in_cart)}'/>
           </form>`).appendTo('body').end().submit();
      });

      function calcSubTotal(qty, price) {
        let subTotal = qty * price;
        return subTotal;
      }
      
      self.$qtyList.click(function() {
        if($(this).find('.dropdown-list').hasClass('toggle-list-display')) { //check if dropdown has been selected before.
          $(this).find('.dropdown-list').removeClass('toggle-list-display')  // if it has, then collapse it
          .end().find('.figure-head').removeClass('toggle-border'); // and remove the border around the top list element
          return; // end function
        }
        self.$qtyList.find('.dropdown-list').removeClass('toggle-list-display'); // if it hasn't been selected before, firstly collapse all dropdowns. 
        $(this).find('.dropdown-list').toggleClass('toggle-list-display').end() // make only selected element dropdown.
        .find('.figure-head').toggleClass('toggle-border'); // and then add border around the top list element
      });

      self.$qty.click(function() {
        let qty = $(this).data('quantity');
        let price = parseInt($(this).parent().data('price'));
        let index = $(this).parent().data('index');
        $(this).parent().siblings('.figure-head').children('span').text(qty);
        let subTotal = calcSubTotal(qty, price);
        self.$subTotal.filter(function() {
          return ($(this).data('index') === index);
        }).text('$'+subTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));

        let total = 0;
        let qty_sum = 0;
        self.$subTotal.each(function(index, elem) {
          total+= parseFloat($(elem).text().replace(/[^\d\.]/g,''));
        })
        $(".total-value").text(`$ ${total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`);  

        $('.figure-head > span').each(function(index, elem) {
          qty_sum+= Number($(elem).text());
        })
        self.$numItemsInCart.text(`Cart (${qty_sum} items)`);
        $('#layout__cart-items-counter').text(`(${qty_sum})`);
      });

      self.$currentPrice.css({
        fontSize: "1.5rem",
        color: "#000",
        marginBottom: "1rem",
        fontWeight: 500
      });
      self.$oldPrice.text("$00,000").css({
        fontSize: "1.3rem",
        fontWeight: 500,
        color: "rgb(122, 122, 122)",
        marginBottom: ".5rem",
        textDecoration: "line-through"
      });
      self.$priceDiff.text(`Savings: $00,000`).css({
        color: "#7ed321",
        fontSize: "1.2rem",
        fontWeight: 500
      });
      self.$numItemsInCart.text(`Cart (${Titems} items)`);
      self.$cartItemsCounter.text(Titems ? `(${Titems})` : "");

    },

      /* Converts a JSON string to a JavaScript object
		 * @param str String the JSON string
		 * @returns obj Object the JavaScript object
		 */

    _toJSONString: function( obj ) {
			var str = JSON.stringify( obj );
			return str;
    },

    /* Update session storage with refresh data
    * @param arr Array the array of objects
    */

    _updateStore: function(arr) {
      var cartCopy = this._toJSONObject(this.storage.getItem(this.cartName));
      cartCopy.items = arr;
      this.storage.setItem(this.cartName, this._toJSONString(cartCopy));
    },


    /* Converts a numeric string into a number
		 * @param numStr String the numeric string to be converted
		 * @returns num Number the number
		 */
		
		_convertString: function( numStr ) {
			var num;
			if( /^[-+]?[0-9]+\.[0-9]+$/.test( numStr ) ) {
				num = parseFloat( numStr );
			} else if( /^\d+$/.test( numStr ) ) {
				num = parseInt( numStr, 10 );
			} else {
				num = Number( numStr );
			}
			
			if( !isNaN( num ) ) {
				return num;
			} else {
				console.warn( numStr + " cannot be converted into a number" );
				return false;
			}
    },
    
    _toJSONObject: function( str ) {
			var obj = JSON.parse( str );
			return obj;
    }
  }

  $(function() {
    var Shop = new $.Shop('body');
  })
})(jQuery)