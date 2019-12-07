// Add To Cart Logic

(function($) {
  $.Shop = function( element ) {
    this.$element = $( element );
    this.init();
  };

  $.Shop.prototype = {
    init: function() {
      // Properties

      this.cartPrefix = "Shopping-";
      this.cartName = this.cartPrefix + "cart";
      this.shippingRates = this.cartPrefix + "shipping-rates";
      this.total = this.cartPrefix + "total";
      this.storage = sessionStorage;
      this.total_items = "Total_items";

      this.$formAddToCart = this.$element.find( "form.add2cart__form" ); // Forms for adding items to the cart
      this.$backdrop__btnContinue = this.$element.find(".backdrop__btn-continue") // Continue Shopping button
      this.$backdrop__btnCheckout = this.$element.find(".backdrop__btn-checkout") // Continue Shopping button
      this.$backdrop__close = this.$element.find(".backdrop__close"); // backdrop close button
      this.$backdrop__info1 = this.$element.find("#backdrop__info1"); // Prompts User to be sure
      this.$add2cart__label = this.$element.find(".add2cart__label"); // Checkbox input for select product size
      this.$backdrop = this.$element.find("#backdrop"); // add to cart warning backdrop
      this.$error_msg = this.$element.find(".error_msg"); // backdrop error message
      this.$cartItemsCounter = $('body').find("#layout__cart-items-counter"); // Cart Items Counter
      this.$implicitForm = $('body').find(".implicit-form");
      
      // Method invocation

      this.createCart();
      this.handleAddToCartForm();
      this.handleSelectSize();
      this.closeBackDrop();
    },

    // Public methods

    // Creates the cart keys in the session storage

    createCart: function() {
      if( this.storage.getItem(this.cartName) == null) {
        var cart = {};
        cart.items = [];

        this.storage.setItem( this.cartName, this._toJSONString( cart ) );
        this.storage.setItem( this.shippingRates, "0" );
        this.storage.setItem(this.total, "0")
        this.storage.setItem(this.total_items, "0")
      }
    },

    // Adds items to the shopping cart
		
		handleAddToCartForm: function() {

      // variable declaration
      var self = this
      var $form = self.$formAddToCart;
      var $product = $form.parent();
      var name =  $product.data( "name" );
      var imgURL = $product.data( "imgurl" );
      var price = self._convertString( ($product.data( "price" ) || '') );
      var total_items = self.storage.getItem(self.total_items);


      // initiated functions
      
      self.$implicitForm.css('display','inline').prepend(`<input type="hidden" name="cart_items" />`)
      self.$cartItemsCounter.text('(' + (total_items || "") + ')');

      // functions called based on events

      self.$backdrop__btnContinue.click(function() {
        self.$backdrop.hide();
      });

      self.$backdrop__btnCheckout.click(function() {
        self.$add2cart__label.find('.add2cart__input').prop('checked', false);
        $(this).parent().submit();
      });

      $form.submit(function( event ) {
        event.preventDefault();
        if (self.$add2cart__label.find('input:checked').val() == undefined) {
          document.querySelector('#backdrop').style.display = 'flex';
          var info2 = document.querySelector('#backdrop__info2');
          info2.style.display = 'block';
          info2.previousElementSibling.style.display = 'none';
          $('body').css('overflow', 'hidden');
          self.$error_msg.text('Required Field').css({
            color: 'red', 
            marginTop: '2rem',
            fontSize: '1.4rem'
          });
        } else {
            
            var category = self.$add2cart__label.find('input:checked').data('category');
            switch(category) {
              case 'footwear': 
                var size = `Size [UK]: ${self.$add2cart__label.find('input:checked').val()}`;
            }

            var cart = self.storage.getItem(self.cartName);
            var cartCopy = self._toJSONObject(cart);
            var result = self._containsObject({name, price, size}, cartCopy.items);
            if(result) {
              alert('already added to cart');
            } else {
              var total_items = self.storage.getItem(self.total_items);
              total_items++;
              self.storage.setItem(self.total_items, total_items);
              self.$cartItemsCounter.text('(' + total_items + ')');
              

              cartCopy.items.push({
                name,
                price,
                size,
                imgURL
              });
              
              let serverData = encodeURIComponent(self._toJSONString(cartCopy.items));
              console.log(serverData);
              self.$implicitForm.find('input').val(serverData);

              self.storage.setItem(self.cartName, self._toJSONString(cartCopy));

              self.$backdrop.css({
                display: 'flex'
              }).find('#backdrop__info1').css({
                display: 'block'
              }).siblings().hide();
            }
        }
      });
    },

    closeBackDrop: function() {
      self = this;
      self.$backdrop__close.click(function() {
        $(this).parent().parent().hide()
      })
    },
    
    handleSelectSize: function() {
      self = this;
  
      self.$add2cart__label.click(function () {
        $(this).css({borderColor: 'rgb(236, 109, 109)'}).find('.add2cart__input').prop('checked', true);
        var cs = $(this).siblings().css({borderColor: 'rgb(196, 196, 196)'}).find('.add2cart__input').prop('checked', false);
      });
    },

    // Private Methods

    _toJSONString: function( obj ) {
			var str = JSON.stringify( obj );
			return str;
    },


    /* Converts a JSON string to a JavaScript object
		 * @param str String the JSON string
		 * @returns obj Object the JavaScript object
		 */
		
		_toJSONObject: function( str ) {
			var obj = JSON.parse( str );
			return obj;
    },
    
    _containsObject(obj, list) {
      if (list.some((item) => {
        return (item.name === obj.name && item.size === obj.size)
      })) {
          return true;
      }

      return false;
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
  }

  $(function() {
    var shop = new $.Shop( "#site" );
  });

})( jQuery );
