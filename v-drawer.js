$(function() {
    var cartCont = document.querySelector('.hc-cartDrawer');
    $('.cart-icon--basket1, .cart-icon--basket2, .custom-overlay, .v-check-viewcart').click(function(event) { //open the drawer cart on some elements click -- change the cart-icon classes (not the custom-overlay one!) to the item
        event.preventDefault();
        $(".custom-overlay").toggle();
        cartCont.classList.toggle("v-drawer-open");
    });
    $('.hc-close').click(function() { //hide the drawer when you click on X close button
        $(".custom-overlay").hide();
        cartCont.classList.toggle("v-drawer-open");
    });
    $(document).on('click', '.plus-quantity', function(e) { //quantity increment functionality
        e.preventDefault();
        var $input = $(this).siblings('.quantity-input');
        var newValue = parseInt($input.val()) + 1;
        $input.val(newValue).trigger('change');
        return false;
    });
    $(document).on('click', '.minus-quantity', function(e) { //quantity decrement functionality
        e.preventDefault();
        var $input = $(this).siblings('.quantity-input');
        var newValue = parseInt($input.val()) - 1;
        $input.val(newValue).trigger('change');
        return false;
    });
    $(document).on('click', '.hc-remove', function(e) { //remove button functionality - set the quantity input value to 0 triggering a change event to re-set the AJAX request
        e.preventDefault();
        var $input = $(this).siblings('.quantity-input');
        $input.val('0').trigger('change');
        return false;
    });
    $(document).on('change', '.quantity-input', function() {
        var $update = {};
        $update[$(this).closest('.item-details').data('id')] = parseInt($(this).val());
        $.ajax({
            method: 'POST',
            datatype: 'json',
            data: {
                updates: $update
            },
            url: '/cart/update.js',
            success: function() {
                $.getJSON('/cart.js', function(cart) {
                    var size = cart.item_count;

                    // remove all drawer cart contents
                    $('.v-drawer-items').remove(); 

                    // set total price
                    document.querySelector('.subtotal').lastElementChild.innerHTML = Shopify.formatMoney(cart.total_price, theme.moneyFormat); 
                  
                    // we will re-create the v-drawer-items container div, appending an 'item-details' container div for each product in ajax item cart response
                      $('.hc-mini-table').append('<div class="v-drawer-items">');
                        $(cart.items).each(function(index, item) {
                            $('.v-drawer-items').append('<div class="item-details" data-id="' + item.id + '"><div class="td-image"><img src="' + item.image + '" /></div><div class="v-drawer-info"><div class="mini_cart_title_price"><div class="v-drawer-ptitle">' + item.product_title + '</div><div class="v-drawer-price"><span class="item-price">' + Shopify.formatMoney(item.price, theme.moneyFormat) + '</span></div></div><div class="v-drawer-qty"><a href class="minus-quantity">&minus;</a><input type="text" class="quantity-input  drawer-quantity-value" value="' + cart.item_count + '"><a href class="plus-quantity">&plus;</a><a class="hc-remove" href="">Remove</a></div></div></div>');
                        });
                      $('.hc-mini-table').append('</div>');
                    // done recreating the inner drawer items response
                  
                    // if we had something in the cart, let's say 1 product and clicked the 'Remove' button thus making the cart empty, show the empty element (aka your cart is empty continue shopping stuff) and hide the actual form
                    if (document.querySelector('.v-drawer-items').childElementCount == 0) {
                        document.querySelector('.v-drawer-empty').style.display = "flex";
                        document.querySelector('#mini-cart').querySelector('form').style.display = "none";
                    }
                });
            },
            error: function(message) {
                if (message['status'] == 200) {
                    $.getJSON('/cart.js', function(cart) {
                        var size = cart.item_count;
                        $('.v-drawer-items').remove();
                        $('.hc-mini-table').append('<div class="v-drawer-items">');
                        $(cart.items).each(function(index, item) {
                            $('.v-drawer-items').append('<div class="item-details" data-id="' + item.id + '"><div class="td-image"><img src="' + item.image + '" /></div><div class="v-drawer-info"><div class="mini_cart_title_price"><div class="v-drawer-ptitle">' + item.product_title + '</div><div class="v-drawer-price"><span class="item-price">' + Shopify.formatMoney(item.price, theme.moneyFormat) + '</span></div></div><div class="v-drawer-qty"><a href class="minus-quantity">&minus;</a><input type="text" class="quantity-input  drawer-quantity-value" value="' + cart.item_count + '"><a href class="plus-quantity">&plus;</a><a class="hc-remove" href="">Remove</a></div></div></div>');
                        });
                        $('.hc-mini-table').append('</div>');
                    });
                }
            }
        });
        return false;
    });
});
