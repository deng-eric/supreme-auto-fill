var info = {
  //'desired_sizes': ['Large', 'XLarge', 'Medium', 'Small'], // arranged in order of preference
  'name'            : 'Louis H. Beast',
  'email'           : 'louishbeast@collab.com',
  'address_1'       : '2 Supreme St.',
  'address_2'       : 'Suite 6',
  'city'            : 'Toronto',
  'state'           : '9', // 0 index. count on the supreme site i'm not going to list it here
  'country'         : '1', //set 0 for USA, and 1 for CANADA
  'zipcode'         : 'M5G2K2',
  'tel'             : '(123) 456-7890', // must be in this format
  'card'            : '1111 2111 3111 4111', // credit card # in this field with spaces
  'expiry_month'    : '01', // must be number with leading 0 if jan - sept
  'expiry_year'     : '2020', // 4 digit year
  'security_code'   : '404' // a 3 or 4 digit CVV code on the back of card 
};

var size = "Large";

function selectSize() {
  console.log('Selecting size');
  var foundsize = $('#s').find('*').filter(function() {return $(this).text() === size;});
  if(foundsize.text() === size){
        console.log("Found size!");
        foundsize.attr('selected', 'selected');
        addToCart();
  }
  else{
      console.log("L. No sizes left!!!!!")
      sleep(1500);
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function addToCart() {
  console.log('Adding to cart..');
  $('#add-remove-buttons :submit').click();
  //TODO: MAKE A BETTER THING HERE
  sleep(500);
  checkout();
}

function checkout(){
  console.log('Going to checkout page...');
  window.location.href = $('.button.checkout').attr("href");
 // autofill();
}

function setCountry(){
    evt = new Event("change"), refresh = function(n) {n.dispatchEvent(evt);};

    var country = $("#order_billing_country")[0];
    country.selectedIndex = info.country, refresh(country);
}

function setState(){
    evt = new Event("change"), refresh = function(n) {n.dispatchEvent(evt);};

    var state = $("#order_billing_state")[0];
    state.selectedIndex = info.state, refresh(state);
}

function autofill(){
    console.log('Autofilling...');
    $('#order_billing_name').val(function() {
       return info.name;
    });

    $('#order_email').val(function() {
        return info.email;
    });

    $('#order_tel').val(function() {
        return info.tel;
    });

    $('#bo').val(function() {
        return info.address_1;
    });

    $('#oba3').val(function() {
        return info.address_2;
    });  

    $('#order_billing_zip').val(function() {
        return info.zipcode;
    });  

    $('#order_billing_city').val(function() {
        return info.city;
    });  

    setCountry();

    setState();

    $('#cnb').val(function() {
        return info.card;
    }); 

    $('#credit_card_month').find('*').filter(function() {
        return $(this).text() === info.expiry_month;}).attr('selected', 'selected');

    $('#credit_card_year').find('*').filter(function() {
        return $(this).text() === info.expiry_year;}).attr('selected', 'selected');

    $('#vval').val(function() {
        return info.security_code;
    }); 
}

//check what page i'm on
function checkPage(){
    console.log('checking page...');

    //if on product page, add to cart
    if ($('div#details').length) {
        selectSize();
    }
    //if on payment, pay
    else if ($('form#checkout_form').length) {
        autofill();
    }
    //check cart to see if need to remove

    else {
      setTimeout(function() {
        checkPage();
      }, 1000);
    }
 }

$(document).ready(function() {
    checkPage();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.text == "give me supreme") {
    checkPage();
    }
});










