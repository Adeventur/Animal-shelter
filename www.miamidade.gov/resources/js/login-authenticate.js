//allows you to save any object in cookie
$.cookie.json = true;

var urlCheckToken = window.location.hash

if (urlCheckToken.indexOf("access_token") >= 0) {

  var urlToken = urlCheckToken.substring(
    urlCheckToken.lastIndexOf("token=") + 6,
    urlCheckToken.lastIndexOf("&token")
  );

  $.ajax({

    type: 'GET',
    url: 'https://accounts.miamidade.gov/uaa/userInfo?access_token=' + urlToken,
    processData: true,
    async: true,
    data: {},
    cache: false,
    crossDomain: true,
    dataType: 'json',
    success: function(data) {
      //creation of user cookie with its corresponding info
      $.cookie('user', data, {
        path: '/'
      });
    },

    error: function() {
      console.log("API Call Failed!")
    }

  });

}


var authenticate = (function() {

  var authenticated = false;

  var getAccess = function() {
    hasAccess().done(function(data) {
        if (data) {

          var currentUser = $.cookie('user');

          $('#userFirstName').html(currentUser.firstName);
          $('#userLastName').html(currentUser.lastName);


          console.log('User first name is ' + currentUser.firstName);
          console.log('User last name is ' + currentUser.lastName);
          console.log('User email is ' + currentUser.email);
          console.log('User mobile phone is ' + currentUser.mobilePhone);

          setlogin();
          authenticated = true;
        } else {

          //if the user is not logged in anymore and the cookie exist remove it
          if (typeof $.cookie('user') !== 'undefined') {
            $.removeCookie('user', {
              path: '/'
            });
          }


          setlogout();
          authenticated = false;
        }
      })
      .fail(function(data) {
        setlogout();
        authenticated = false;
      });
  };

  var hasAccess = function() {

    var hasAccessInfo = function() {

      return $.ajax({
        url: "https://accounts.miamidade.gov/uaa/hasAccess",
        xhrFields: {
          withCredentials: true
        },
        method: "GET"
      });


    }

    return hasAccessInfo();
  };

  var setlogin = function() {
    $("#loginId").hide();
    $("#createAccount").hide();
    $("#logoutId").show();
    $('.login-container').show();
    $('.log-in-out').hide();


    if($('.global-nav-signed').length) {
      $('.site-navigation-container').addClass('global-nav--d-none');
      $('.global-nav-signed').removeClass('global-nav--v-hidden');
    }
  };

  var setlogout = function() {
    $("#loginId").show();
    $("#createAccount").show();
    $("#logoutId").hide();
    $('.login-container').hide();
    $('.log-in-out').show();


    if($('.global-nav-signed').length) {
      $('.site-navigation-container').removeClass('global-nav--v-hidden');
      $('.global-nav-signed').addClass('global-nav--d-none');
    }

  };

  return {
    getAccess: getAccess,
    authenticated: authenticated
  }
})();