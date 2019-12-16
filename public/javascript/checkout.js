(function($) {
  $.Shop = function(element) {
    this.$element = $(element);
    this.init();
  }

  $.Shop.prototype = {
    init: function() {
      this.$indicant = this.$element.find(".checkout-form").data("indicant");
      this.$body = this.$element.find(".body");
      
      // Initiate the following functions
      this.handleDisplayModes();
    },
    handleDisplayModes: function() {
      const self = this;
      switch(self.$indicant) {
        case 1:
          self.$body.addClass('hide').each(function(index, element) {
            if($(element).hasClass("address-form__body")) {
              $(element).removeClass('hide');
            }else if($(element).hasClass("order-summary__body")) {
              $(element).removeClass('hide');
            }
          });
          break;
        case 2:
          self.$body.addClass('hide').each(function(index, element) {
            if($(element).hasClass("delivery-form__body")) {
              $(element).removeClass('hide');
            } else if($(element).hasClass("address-form__body")) {
              $(".under-lay1").css({
                display: 'block'
              });
            }
            else if($(element).hasClass("order-summary__body")) {
              $(element).removeClass('hide');
            }
          });
          break;
          case 3:
            self.$body.addClass('hide').each(function(index, element) {
              if($(element).hasClass("payment-form__body")) {
                $(element).removeClass('hide');
              }else if($(element).hasClass("delivery-form__body") ) {
                $('.under-lay1').css({
                  display: 'block'
                });
              } else if($(element).hasClass("address-form__body")) {
                $('.under-lay2').css({
                  display: 'block'
                });
              }else if($(element).hasClass("order-summary__body")) {
                $(element).removeClass('hide');
              }
            });
            break;
      }
    }
  }

  $(function() {
    var shop = new $.Shop("body");
  })
})(jQuery);