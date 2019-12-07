// Cart n Checkout Logic

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
      this.shippingRates = this.cartPrefix + "shipping-rates";
      this.total = this.cartPrefix + "total";
      this.total_items = "Total_items";
      this.storage = sessionStorage;

      // DOM Elements
      this.$numItemsInCart = this.$element.find('#numItemsInCart');
      this.$cartItemsCounter = this.$element.find('#cart-items-counter');
      this.$qtyList = this.$element.find('.qty-list');
      this.$currentPrice = this.$element.find('.current-price');
      this.$oldPrice = this.$element.find('.old-price');
      this.$priceDiff = this.$element.find('.price-diff');
      

      // Method Invocations and Property declarations

      var self = this;
      var cartCopy = self._toJSONObject(this.storage.getItem(this.cartName));
      var items = cartCopy.items;


      self.$qtyList.click(function() {
        if($(this).find('.dropdown-list').hasClass('toggle-list-display')) {
          $(this).find('.dropdown-list').removeClass('toggle-list-display')
          .end().find('.figure-head').removeClass('toggle-border');
          return;
        }
        self.$qtyList.find('.dropdown-list').removeClass('toggle-list-display');
        $(this).find('.dropdown-list').toggleClass('toggle-list-display').end()
        .find('.figure-head').toggleClass('toggle-border');
      });


      $('.qty').click(function() {
        let qty = $(this).data('quantity');
        let price = parseInt($(this).parent().data('price'));
        let index = $(this).parent().data('index');
        $(this).parent().siblings('.figure-head').children('span').text(qty);
        let subTotal = calcSubTotal(qty, price);
        $('.sub-total').filter(function() {
          return ($(this).data('index') === index);
        }).text('$'+subTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
      });
      

      var Titems = self._convertString(this.storage.getItem(this.total_items));
      self.$numItemsInCart.text(`Cart (${Titems} items)`);
      self.$cartItemsCounter.text(`(${Titems})`);

      
      function calcSubTotal(qty, price) {
        let subTotal = qty * price;
        return subTotal;
      }

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
      })

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