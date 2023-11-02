jQuery(function(){
  $.ajax({

    type: 'GET',
    url: 'https://accounts.miamidade.gov/uaa/configuration',
    processData: true,
    async: true,
    data: {},
    cache: false,
    crossDomain: true,
    dataType: 'json',
    success: function(data) {

        $(".dashBoardAPI").attr('href', data.dashboardURL);
        $(".updateProfileAPI").attr('href', data.updateProfileURL);
        $(".loginAPI").attr('href', data.loginURL);
        $(".logoutAPI").attr('href', data.logoutURL);
        $(".registrationAPI").attr('href', data.registrationURL);

    },

    error: function() {
      console.log("API Call Failed!")
    }

  });



  // $.ajax({

  //   type: 'GET',
  //   url: 'https://accounts.miamidade.gov/myaccount/uaa/userInfo',
  //   processData: true,
  //   async: true,
  //   data: {},
  //   cache: false,
  //   crossDomain: true,
  //   dataType: 'json',
  //   success: function(data) {

  //       $("#accountsFirstName").text(data.firstName);
  //       $("#accountsLastName").text(data.lastName);
  //   },

  //   error: function() {
  //     console.log("API Call Failed! No user info returned!")
  //   }

  // });






  
});