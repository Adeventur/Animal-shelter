
function checkFlexMenu(){
  if ($('.flexMenu-viewMore').length){
    $('.flexMenu-viewMore> ul > li').unwrap().prev().unwrap().first().remove();
  }
}

function infographic() {


  if($('.infographic').length) {  

    $('.infographic__front-back').on("mouseenter focus", function(event){

      if(!$(this).hasClass('infographic__item--active')){

      $(this).children('.infographic__intro').addClass('infographic--hide');
      $(this).children('.infographic__main').removeClass('infographic--hide');
      $(this).find('.infographic--hide').attr('aria-hidden', 'true');
      $(this).children(":not(.infographic--hide)").attr('aria-hidden', 'false');
      }
    });


    $('.infographic__front-back').on("mouseleave blur", function(event){

      if(!$(this).hasClass('infographic__item--active') && !$(this).is(':focus')){

      $(this).children('.infographic__intro').removeClass('infographic--hide');
      $(this).children('.infographic__main').addClass('infographic--hide');
      $(this).find('.infographic--hide').attr('aria-hidden', 'true');
      $(this).children(":not(.infographic--hide)").attr('aria-hidden', 'false');
      }
    });


    // $(".infographic__item").on('click', function(){
    //   $(this).toggleClass('infographic__item--active');

    //   $(this).children('.infographic__intro').addClass('infographic--hide');
    //   $(this).children('.infographic__main').removeClass('infographic--hide');
    //   $(this).find('.infographic--hide').attr('aria-hidden', 'true');
    //   $(this).children(":not(.infographic--hide)").attr('aria-hidden', 'false');
    // });  

  }
}


// check for resize events + setTimeout to economize use ------------
function resizeId(){

  $(window).on('resize', function(e) {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 350);
  });

}

// check screen width
function doneResizing(){

  if (window.innerWidth < '992'){

    // if Flex function ran remove structure
    checkFlexMenu();

    $('.global-header-container').removeClass('navbar-fixed');

  } else {


    if ($('.page-navigation__list').length){

      setTimeout(function(){ 

        //Adds "MORE" when top nav is too long
        $('ul.page-navigation__list').flexMenu({
          cutoff: 1
        });


      }, 500);


    }


    //The Page Navigation needs different calls from its regular and fixed state because the aria-controls and the corresponding id need to be unique

    //Regular Page Navigation
    $('.pageNavigationContainer .flexMenu-viewMore > a').wrapInner("<button aria-controls='flexMenuMore' aria-expanded='false' class='flex-menu-more'></button>");
    $('.pageNavigationContainer .flexMenu-popup').attr({id:'flexMenuMore', 'aria-hidden':'true'});

    //Fixed Page Navigation while you scroll
    $('.pageNavigationContainer-hidden .flexMenu-viewMore > a').wrapInner("<button aria-controls='flexMenuMoreHidden' aria-expanded='false' class='flex-menu-more'></button>");
    $('.pageNavigationContainer-hidden .flexMenu-popup').attr({id:'flexMenuMoreHidden', 'aria-hidden':'true'});

    //Targeting both fixed and regular page navigation
    $('.flexMenu-viewMore > a > button').unwrap();
    
    //Fixed Page Navigation while you scroll
    

    //Deleting the display:block that shows up inline


    setTimeout(function(){ $('.flexMenu-popup').css('display',''); }, 500);


    if (!$('.global-header-container').hasClass("navbar-fixed")) {

      $(window).on('scroll' , function(e){
        var globalNavigation = $('.global-header-container');
        var windowTop = $(window).scrollTop() > 5;

        if (windowTop) {
            globalNavigation.addClass('navbar-fixed');
        } else {
            globalNavigation.removeClass('navbar-fixed');
        };

      });



    }

    //checkDropdown();


  };

  fixedPageNavigation();

}

function checkDropdown(){

  if ($(window).innerWidth() < $('ul.site-nav-content > li.dropdown:last > ul').offset().left + 495){

    var windowWidth = $(window).innerWidth();

    $('ul.site-nav-content > li.dropdown > ul').each(function(){

      $(this).removeAttr('style');//Remove inline style if the script ran. Start fresh each time.

      var navDropdown = $(this).offset().left + 495;
      var sum = windowWidth - navDropdown; //Gets how much of the dropdown is off the screen.

      if (navDropdown > windowWidth){
        $(this).css('left', sum);
      }

      if (sum < -184){
        $(this).removeAttr('style'); //Remove inline-style to readjust to opening to the left instead of the right.
        $(this).parent('.dropdown').addClass('noflex-dropdown');
      }

    });
  }

}

// adds back to top button
function backToTop(){

  var lastScrollTop = 0;

  $(window).on('scroll' , function(e){

    var st = $(this).scrollTop();

       if (st > lastScrollTop){
           // downscroll code
           $('.back-to-top').removeClass('top-active');

       } else {
          // upscroll code
          if(st < 350) {

            $('.back-to-top').removeClass('top-active');
           } else {

              $('.back-to-top').addClass('top-active');
           };
       };

       lastScrollTop = st;
    });

}


function sticky_relocate() {

  /*

    if($('.sticky-anchor').length) {

      var window_top = $(window).scrollTop();
      var div_top = $('.sticky-anchor').offset().top;

      if (window_top > div_top){
          $('.search-filters').addClass('sticky');
      } else {
          $('.search-filters').removeClass('sticky');
      };
  }
  */

}

// animation for the page navigation
function pageNavAnimate(e){

  e.preventDefault();
  var section = $(this).data("page-navigation-items");

  $("html, body").animate({
    scrollTop: $(section).offset().top - 120
  });

}

function fixedPageNavigation() {

  if (window.innerWidth > '600') {

    $(window).on('scroll' , function(e){

      var pageNavigation = $('.pageNavigationContainer-hidden, .banner-initiatives-navigation-hidden');
      var windowTop = $(window).scrollTop();

        if($('.pageNavigationContainer, .banner-initiatives-navigation').length){
          if (windowTop > $('.pageNavigationContainer, .banner-initiatives-navigation').offset().top) {
              pageNavigation.addClass('fixed');
          } else {
              pageNavigation.removeClass('fixed');
          };
        };
    });

  };

}






// .COM / .NET WARNING DISCLAIMER --------------------------------
//0 means disabled; 1 means enabled;
var popupStatus = 0;

function loadPopup(){
  //loads popup only if it is disabled
  if(popupStatus==0){
    $("#pwBackgroundPopup").css({
      "opacity": "0.7"
    });
    $("#pwBackgroundPopup").fadeIn("slow");
    $("#popupWarning").fadeIn("slow");
    popupStatus = 1;

    $('#pwAlertButton').focus();

  }
}

function disablePwPopup(){
  //disables popup only if it is enabled
  if(popupStatus==1){
    $("#pwBackgroundPopup").fadeOut("slow");
    $("#popupWarning").fadeOut("slow");
    popupStatus = 0;
  }
}


$.fn.centerInClient = function(options) {
    var opt = { forceAbsolute: false,
                container: window,    // selector of element to center in
                completeHandler: null
              };
    $.extend(opt, options);

    return this.each(function(i) {
        var el = $(this);
        var jWin = $(opt.container);
        var isWin = opt.container == window;

        // force to the top of document to ENSURE that
        // document absolute positioning is available
        if (opt.forceAbsolute) {
            if (isWin)
                el.remove().appendTo("body");
            else
                el.remove().appendTo(jWin.get(0));
        }

        // have to make absolute
        el.css("position", "absolute");

        // height is off a bit so fudge it
        var heightFudge = isWin ? 2.0 : 1.8;

        var x = (isWin ? jWin.width() : jWin.outerWidth()) / 2 - el.outerWidth() / 2;
        var y = (isWin ? jWin.height() : jWin.outerHeight()) / heightFudge - el.outerHeight() / 2;

        el.css("left", x + jWin.scrollLeft());
        el.css("top", y + jWin.scrollTop());

        // if specified make callback and pass element
        if (opt.completeHandler)
            opt.completeHandler(this);
    });
}


//whitelist used for checking URL in the global nav and footer
const checkUrlsWhitelist = [
  '/employee/',
  '/myemployee/',
  '/WebESSZ/',
  '/bluebookservice/',
  '/pkmslogout'
]

//switching URL's from secure to www if the link is not apart of employee or myemployee
function checkUrls(elementClass, arr, envir) {
  $(elementClass).each(function(){

    let elementHref = $(this).prop('href'); //grabbing the href

    if(envir === 'secure') {//if you're in the "secure" subdomain
      let newHref = elementHref.replace("https://secure", "https://www"); //changing the subdomain from secure to www

      //checking the whitelist; if part of the URL does not exist inside the whitelist then continue
      if (!arr.some(v => elementHref.includes(v))) {
          $(this).attr('href', newHref);
      }

    } else {//if you're in the "www" subdomain
      let newHref = elementHref.replace("https://www", "https://secure"); //changing the subdomain from www to secure

      //checking the whitelist; if part of the URL is in the whitelist that means it SHOULD be changed
      if (arr.some(v => elementHref.includes(v))) {
          $(this).attr('href', newHref);
      }

    }
  
  });
}





/******************* DOCUMENT READY *******************/



$(document).ready(function() {

  //passing in org name into the Feedback link in the footer
  let orgElement = document.getElementById('orgName');

  if(orgElement) {
    let feedbackLink = document.getElementById('feedback').getAttribute('href');
    let orgName = orgElement.textContent;
    let feedbackParameter = feedbackLink.concat("?orgName=", orgName);

    document.getElementById('feedback').setAttribute("href", feedbackParameter)
  }

  const url = new URL(window.location.href);

  //Checking for parameter hideHeader
  const checkHeaderHide = url.searchParams.get("hideHeader");

  //Hidiing elements in the header
  const hideHeader = document.getElementsByClassName("global-header-container");
  const hideImportantMessage = document.getElementsByClassName("global-important__ie");

  if(checkHeaderHide == "true") {
    hideHeader[0].style.display = "none";
    hideImportantMessage[0].style.display = "none";


    const pageNav = document.getElementsByClassName("pageNavigationContainer-hidden");

    if(pageNav.length > 0) {
      pageNav[0].style.top = "0"; //if page navigation exist set it to the top of the screen since the header is now set to display none
    }

  }

  //Checking for parameter hideFooter
  const checkFooterHide = url.searchParams.get("hideFooter");

  //Hiding elements in the footer, including the floating bar
  const hideFooter = document.getElementsByClassName("site-footer-container");
  const hideFloatingBar = document.getElementsByClassName("floating-bar");

  if (checkFooterHide == "true") {
    hideFooter[0].style.display = "none";
    hideFloatingBar[0].style.display = "none";
  }

  //Checking for parameter hideFilter
  const checkFilterHide = url.searchParams.get("hideFilter");

  const checkSearchTitle = url.searchParams.get("hideSearchTitle");


  //timeout needed since elements don't exist on init since its angular
  setTimeout(() => {

    //Hiding elements related to search filters
    const hideFilterDesktop = document.getElementsByClassName("search__item search__filter-container");
    const hideFilterMobile = document.getElementsByClassName("mobile-filter");
    const hideFilterSelected = document.getElementsByClassName("secondary-filters__selected");
    const hideBreadcrumbs = document.getElementsByClassName("iw-breadcrumb");//hiding breadcrumbs

    if (checkFilterHide == "true") {
      hideFilterDesktop[0].style.display = "none";
      hideFilterMobile[0].style.display = "none";
      hideFilterSelected[0].style.display = "none";
      hideBreadcrumbs[0].style.display = "none";
    }

    const hideSearchTitle = document.getElementsByClassName("mdc-search-title");

    if (checkSearchTitle == "true") {
      hideSearchTitle[0].style.display = "none";
    }


  }, 200);


   //Auto switch the URL's; this is needed since the URL's are relative and the subdomain needs to change depending on what environment you're in.
  try {
    if (location.host.startsWith('secure.')) {

      checkUrls('.global-important a', checkUrlsWhitelist, 'secure');//Resources; links above navigation
      checkUrls('.global-header-container a', checkUrlsWhitelist, 'secure');//Desktop Navigation
      checkUrls('.site-footer-container a', checkUrlsWhitelist, 'secure'); //Footer
      checkUrls('.mobile-content ul a', checkUrlsWhitelist, 'secure');//Mobile Navigation
      checkUrls('.right-content .card a', checkUrlsWhitelist, 'secure');//Agency Card's in the right

    }

    if (location.host.startsWith('www.')) {

      checkUrls('.global-important a', checkUrlsWhitelist, 'www');//Resources; links above navigation
      checkUrls('.global-header-container a', checkUrlsWhitelist, 'www');//Desktop Navigation
      checkUrls('.site-footer-container a', checkUrlsWhitelist, 'www'); //Footer
      checkUrls('.mobile-content ul a', checkUrlsWhitelist, 'www');//Mobile Navigation

    }
  } catch (err) {
    console.error(err);
  }


  /*******************
    Important Message 
  ********************/

  // check to see if the submited cookie is set, if not check if the popup has been closed, if not then display the popup
 if(getCookie('popupCookie') != 'surveyClicked' ){
   $('#skipNavMain').after('<a href="https://feedback.miamidade.gov/jfe/form/SV_bEg8ZtnDNi1XVXw" class="sr-only" id="ada-survey">Assistive Technology Survey</a>')
 }
  
 $('#ada-survey').click(function(){
    // sets the coookie to one minute if the popup is closed (whole numbers = days)
    // setCookie( 'popupCookie', 'closed', .00069444444 );
   setCookie( 'popupCookie', 'surveyClicked', 1 );
 });
  
 function getCookie(cname) {
   var name = cname + "=";
   var ca = document.cookie.split(';');
   for (var i = 0; i < ca.length; i++) {
     var c = ca[i];
     while (c.charAt(0) == ' ') {
       c = c.substring(1);
     }
    if (c.indexOf(name) == 0) {
       return c.substring(name.length, c.length);
     }
   }
   return "";
 }

 function setCookie(cname, cvalue, exdays) {
   var d = new Date();
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
   var expires = "expires=" + d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
 }

  infographic();

  //this was done for ADA purposes. 1 second timeout is needed since this is injected through another script.
  setTimeout(function () {
    $("img[src*='nova.collect.igodigital.com']").each(function() {
      $(this).attr("title", "");
    });
  }, 1000);

  $('.site-navigation__link-button').next().each(function() {
    $height = $(this).height();
    $(this).css({
      'height': $height,
      'visibility': 'visible'
    });
    $(this).hide();
  });


  //opens the sideMenu
  $("#mobileMenuBars").on('click', function(){
     $('#sideMenu').toggle("slide");
     $('#sideMenu').addClass('active');
    $('#sidemenuOverlay').show();
     $('body').toggleClass('side-menu--open');
  });


  //closes the sideMenu if the close button is clicked or the black tint
  $("#sideMenuClose, #sidemenuOverlay").on('click', function(e){
    $('#sideMenu').toggle("slide");
    $('#sideMenu').removeClass('active');

    $('#sidemenuOverlay').hide();
    $('body').toggleClass('side-menu--open');
  });


    //$('.side-menu__main .site-navigation__drop-down').css('height', $('.side-menu__main .site-navigation__drop-down').height());

    $(".site-nav-content button").click(function() {
      var link = $(this);
      var closest_ul = link.closest("ul");
      var parallel_active_links = closest_ul.find(".active")
      var closest_li = link.closest("li");
      var link_status = closest_li.hasClass("active");
      var count = 0;
   
      closest_ul.find("ul").slideUp(function() {
        if (++count == closest_ul.find("ul").length) {
          parallel_active_links.removeClass("active");

          parallel_active_links.children("ul").attr('aria-hidden', 'true');
          parallel_active_links.find("button").attr('aria-expanded', 'false');
        }

      });
   
      if (!link_status) {

        if(link.hasClass('site-navigation__single-drop__link-button')){

          if(!parallel_active_links) {
            closest_li.children("ul").animate({width:'toggle'},700);

          } else {
            //we need the timeout when a child of the single drop is already open to avoid over lapping
            setTimeout(function () {
               closest_li.children("ul").animate({width:'toggle'},700);
            }, 400);

          }


        } else {
          closest_li.children("ul").slideDown({
            start: function () {
              $(this).css({
                display: "flex",
              })
            }
          });
        }



        closest_li.children("ul").attr('aria-hidden', 'false');
        link.attr('aria-expanded', 'true');


        closest_li.addClass("active");
      }
    })





    $(".flex-menu-more").on('click', function(e){
      if ( $(this).attr('aria-expanded') == 'false' ) {
          $(this).attr('aria-expanded', 'true');
          $(this).next().show();
          $(this).next().attr('aria-hidden', 'false');
      } else {
          $(this).attr('aria-expanded', 'false');
          $(this).next().hide();
          $(this).next().attr('aria-hidden', 'true');
      }
    });

    $(".flexMenu-popup > li").on('click', function(e){
      $(this).parent().prev().attr('aria-expanded', 'false');
      $(this).parent().prev().next().hide();
      $(this).parent().prev().next().attr('aria-hidden', 'true');
    });



    $(".side-menu__main button").on('click', function(e){

      

      var link = $(this);
      var closest_ul = link.closest("ul");
      var parallel_active_links = closest_ul.find(".active");
      var closest_li = link.closest("li");
      var link_status = closest_li.hasClass("active");
      var count = 0;
   
      closest_ul.find("ul[aria-hidden]").slideUp(function() {
          parallel_active_links.removeClass("active");

          parallel_active_links.children("ul").attr('aria-hidden', 'true');
          parallel_active_links.find("button").attr('aria-expanded', 'false');

      });

      if (!link_status) {

        closest_li.children("ul[aria-hidden]").slideDown({
          start: function() {
            $(".side-menu__main .dropdown ul li").css('height', 'auto');
          }
        });

        closest_li.children("ul").attr('aria-hidden', 'false');
        link.attr('aria-expanded', 'true');

        closest_li.addClass("active");
      }



      e.stopPropagation();
    });


   // Accordion --------------------------------

  var accordionButtons = $('.site-navigation__link-button, .site-navigation__single-drop__link-button, .flex-menu-more');

  function accordionToggle() {
    // $('.accordion-controls li button, .site-navigation__link-button, .site-navigation__single-drop__link-button, .site-mobile-navigation__link-button, .page-navigation__list').on('click', function(e) {
    $('.accordion-controls li button, .site-mobile-navigation__link-button, .page-navigation__list').on('click', function(e) {
      $control = $(this);

      // console.log($control)
      // console.log($control.context.className);
      // console.log($control[0])
      // console.log($control[0] === 'button.site-navigation__link-button');
       //console.log($control[0].hasClass('site-navigation__link-button'))

      accordionContent = $control.attr('aria-controls');



      //targeting global navigation only
      if($control.hasClass('site-navigation__link-button') || $control.hasClass('site-navigation__single-drop__link-button')) {
        checkOthers($control[0], $control.context.className);


        // if($control.hasClass('site-navigation__single-drop__link-button')) {

        //   $('.site-navigation__drop-down > li').each(function(){
        //     $(this).find('button').attr('aria-expanded', 'false');
        //     $(this).find('ul').attr('aria-hidden', 'true');


        //         setTimeout(function () {
        //           $(this).find('ul').css('display', 'none');
        //         }, 400);

        //   })
        // }


        if($control.hasClass('site-navigation__link-button') && $('.site-nav-content > li').hasClass('open') && (!$($control).closest('.open').length)){

          if($('.site-nav-content > .open').length !== 0){


                var classButton = ".site-nav-content > .open > .site-navigation__link-button"
                
                content = $(classButton).attr('aria-controls');
                $('#' + content).attr('aria-hidden', 'true');

                $(classButton).attr('aria-expanded', 'false');
                
                

                setTimeout(function () {
                  $('#' + content).removeClass('active');
                }, 100);


                setTimeout(function () {
                  $('#' + content).css('display', 'none');
                }, 400);
          }
        }


        if($control.hasClass('site-navigation__link-button')) {
          
          //if the current main navigation button is clicked again
          if($control.parent().hasClass('open')) {
            $control.parent().removeClass('open');
          } else {

            //clear all
            $('.site-nav-content > li').each(function(){
              $(this).removeClass('open');
            })

            //add class to the new main navigation button
            $control.parent().addClass('open');
          }

        }




        if($control.hasClass('site-navigation__single-drop__link-button')) {

          var closest_ul = $control.closest("ul");
          var parallel_active_links = closest_ul.find(".open")
          var count = 0;

          // closest_ul.find("ul").slideUp(function() {
          //   if (++count == closest_ul.find("ul").length)
          //   parallel_active_links.removeClass("open");
          // });

          parallel_active_links.find('button').attr('aria-expanded', "false");

          parallel_active_links.find('ul').hide();
          parallel_active_links.find('ul').attr('aria-hidden', "true");

          //if the current main navigation button is clicked again
          if($control.parent().hasClass('open')) {
            $control.parent().removeClass('open');
          } else {

            //clear all
            $('.site-nav-content > li > ul > li').each(function(){
              $(this).removeClass('open');
            })

            //add class to the new main navigation button
            $control.parent().addClass('open');
          }


        }





      }

      isAriaExp = $control.attr('aria-expanded');
      newAriaExp = (isAriaExp == "false") ? "true" : "false";
      $control.attr('aria-expanded', newAriaExp);

      isAriaHid = $('#' + accordionContent).attr('aria-hidden');
      if (isAriaHid == "true") {
        $('#' + accordionContent).attr('aria-hidden', "false");
        

        //if click is in global navigation make it display flex and add active class; reason for timeout is to give it time for the CSS transition
        if($control.hasClass('site-navigation__link-button') || $control.hasClass('site-navigation__single-drop__link-button')){
          $('#' + accordionContent).css('display', 'flex');
          setTimeout(function () {
            $('#' + accordionContent).addClass('active');
          }, 100);          
        } else {
          $('#' + accordionContent).css('display', 'block');
        }


      } else {
        $('#' + accordionContent).attr('aria-hidden', "true");
        
        //if click is in global navigation remove active; reason for timeout is to give it time for the CSS transition
        if($control.hasClass('site-navigation__link-button') || $control.hasClass('site-navigation__single-drop__link-button')){

          setTimeout(function () {
            $('#' + accordionContent).removeClass('active');
          }, 100);

          setTimeout(function () {
            $('#' + accordionContent).css('display', 'none');
          }, 500);


        } else {
          $('#' + accordionContent).css('display', 'none');
        };


      }
    
   e.stopPropagation();
    });
  };

  function checkOthers(elem, target) {


    



    for (var i=0; i<target.length; i++) {
      if (target[i] != elem) {
        if (($(target[i]).attr('aria-expanded')) == 'true') {
          $(target[i]).attr('aria-expanded', 'false');
          content = $(target[i]).attr('aria-controls');
          $('#' + content).attr('aria-hidden', 'true');
          

          setTimeout(function () {
            $('#' + content).removeClass('active');
          }, 100);


          setTimeout(function () {
            $('#' + content).css('display', 'none');
          }, 400);

        }
      }
    }
  };

  //call this function on page load
  accordionToggle();
  

//if the click is outside the nav container close any nav that is currently open
$(document).on('click', function(e) 
{
    var container = $(".site-nav-content");


    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {

      $('.site-nav-content li button').attr('aria-expanded', 'false');
      $('.site-navigation__billboard').attr('aria-hidden', 'true');

      $('.site-nav-content > li').removeClass('open');

      // $('.site-navigation__billboard').css('display', 'none');

      setTimeout(function () {
        $('.site-navigation__billboard').removeClass('active');
      }, 100);

      setTimeout(function () {
        $('.site-navigation__billboard').css('display', 'none');
      }, 500);



      var link = $(".site-nav-content button");
      var closest_ul = link.closest("ul");
      var parallel_active_links = closest_ul.find(".active");



      closest_ul.find("ul[aria-hidden]").slideUp(function() {
          parallel_active_links.removeClass("active");

          parallel_active_links.children("ul").attr('aria-hidden', 'true');
          parallel_active_links.find("button").attr('aria-expanded', 'false');

      });
    }





    // var sideMenuContainer = $(".side-menu");

    // if (!sideMenuContainer.is(e.target) && sideMenuContainer.has(e.target).length === 0 && sideMenuContainer.hasClass("active")) {
    //   $('#sideMenu').toggle("slide");
    //   $('#sideMenu').removeClass("active");


    //    $('#sidemenuOverlay').hide();
    //    $('body').toggleClass('side-menu--open');
    // }


    var pageNavigation = $('.page-navigation__list button');

    if (pageNavigation.has(e.target).length === 0) {
      $(pageNavigation).attr('aria-expanded', 'false');
      $('.page-navigation__list .flexMenu-popup').attr('aria-hidden', 'true');
      $('.page-navigation__list .flexMenu-popup').css('display', 'none')

    }




    e.stopPropagation();


});





  // Initiate Leaving Website Popup  --------------------------------

  $(".popup").on("click", "a", function(){

    ajmNewSiteURL = $(this).attr("href");
    ajmElement = $(this)


    // if($(this).hasClass('exception')) {
    //   return true;
    // } else {
    //   $("#popupWarning").centerInClient();
    //   loadPopup();
    //   return false;
    // }

  });

    // Initiate Leaving Website Popup 2  --------------------------------

  //saving initial text to append if Elections popup is closed
  var initialText = $('#alert').html();
  
  //append initial text after closing if link contains miamidade.electionsfl.org
  function originalText(){
    if(ajmNewSiteURL.indexOf('miamidade.electionsfl.org') > -1){
      setTimeout(function(){
        $('#alert').empty();
        $('#alert').append(initialText); 
      }, 1000);      
    }
  }


  $("body").on("click", "a", function(){

    ajmNewSiteURL = $(this).attr("href");
    ajmElement = $(this)
    
    if(ajmNewSiteURL === undefined) {
        return true; 
    }

    var urlWhitelist = [
      'miamidade.gov',
      'miami-airport.com',
      'miami-dadeclerk.com',
      'vizcaya.org',
      'miamidadeig.org',
      'miamidadearts.org',
      'arshtcenter.org',
      'smdcac.org',
      'homelesstrust.org',
      'www.mdpls.org',
      'miamidadetpo.org',
      'zoomiami.org',
      'deeringestate.org',
      'historymiami.org',
      'miamidade.granicus.com',
      'portal.unitedwaymiami.org',
      'translate.google.com',
      'google.com',
      'unitedwaymiami.org',
      'miamidadecounty.co1.qualtrics.com',
      'parks305.org',
      'unitedwaymiami.org',
      'govtech.com',
      '#cd-search',
      '#main-content',
      '#googtrans(en|en)',
      '#googtrans(en|es)',
      '#googtrans(en|ht)',
      'miamidade.myhousing.com',
      'risemiamidade.com',
      'floridahealth.gov',
      'cdc.gov/index.htm',
      'miamidadecounty.govqa.us',
      'nomihealth.com',
      'kai.maps.arcgis.com',
      'kaigis.kittelson.com',
      'miamidade.zoom.us',
      'miamidade.mediavalet',
      'miamidadeparks.com',
      ''
    ];
    
    if(ajmNewSiteURL.indexOf('mayor/') === 0){
      location = 'https://miamidade.gov/' + ajmNewSiteURL;
      return false;
    }

      
    if(ajmNewSiteURL === '#' || ajmNewSiteURL == 'null' || ajmNewSiteURL == '' || ajmNewSiteURL[0] == '/') {
      return true;
    }
    

    //custom text needed for Elections
    if(ajmNewSiteURL.indexOf('miamidade.electionsfl.org') > -1){
      $( "#dialogLeavingDesc p:first-child" ).replaceWith( "<p>You are now leaving the official website of Miami-Dade County government, and now entering the Florida Voter Registration Database, managed by VR Systems. This database currently houses your voter record and therefore updates must be made within this database. Please be aware that when you exit this site, you are no longer protected by our privacy or security policies, but rather those in place by VR Systems.</p>" );
      $("#popupWarning").centerInClient();
      loadPopup();

      return false;
    }


    if($(this).hasClass('activatePopup')) {
      $("#popupWarning").centerInClient();
      loadPopup();
      return false;
    }

    if($(this).hasClass('exception')) {
      return true;
    }


    // Check if the link the user clicked on has an href value that matches any of the values in the whitelist.
    var matchingList = [];

    // If one of the values matches then we push the match into an array.


    urlWhitelist.map( function(url) {
      if(url.length > 0 && ajmNewSiteURL.indexOf(url) > -1) {
        matchingList.push(url);
      }
    });

      // GA Event tracking for outbound links. Using a custom event since we're not switching to GA4 yet.
      let domain = (new URL(ajmNewSiteURL));


    if (domain.hostname.indexOf('miamidade.gov') === -1) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        'event': 'eventTracking',
        'category': 'outbound link click',
        'action': domain.hostname,
        'label': domain.href
      })
    }


    // If the matchingList array contains a value then the link is whitelisted.
    if(matchingList.length > 0) {

      return true;
    } else {


      // Otherwise, the popup displays.
      $("#popupWarning").centerInClient();
      loadPopup();
      return false;
    }

  });

  //closing popup
  //Click the x event!
  $("#alert").on('click', '#popupWarningClose', function(e){
    disablePwPopup();
    originalText();
  });

  $("#alert").on('click', '#pwAlertButton', function(e){
    disablePwPopup();
    originalText();

    window.open(ajmNewSiteURL);
  });

  $("#alert").on('click', '#cancelButton', function(e){
    disablePwPopup();
    originalText();
    ajmElement.focus();

  });

  //Click out event!
  $("#alert").on('click', '#pwBackgroundPopup', function(e){
    disablePwPopup();
    originalText();
    ajmElement.focus();
  });
  //Press Escape event!
  $(document).keypress(function(e){
    if(e.keyCode==27 && pwPopupStatus==1){
      disablePwPopup();
      originalText();
      ajmElement.focus();
    }
  });





    //mobile tabs ------------
    $('ul.mobile-top-menu__tabs li').on('click', function(e){
      e.preventDefault;

        var tab_id = $(this).attr('data-tab');

        $('ul.mobile-top-menu__tabs li').removeClass('mobile-top-menu__tab--active');
        $('.mobile-content-tab').removeClass('mobile-content-tab--active');

        $(this).addClass('mobile-top-menu__tab--active');
        $("#"+tab_id).addClass('mobile-content-tab--active');
    });


    //mobile jquery ------------

    var mobileMenu = $('#mobile-menu').unbind();

    mobileMenu.on('click', function(e) {
      e.preventDefault();

      $('.mobile-global-nav').addClass('active');

    });

    $('#mobile-global-close').on ('click', function(e){
      e.preventDefault();
      $('.mobile-global-nav').removeClass('active');
    });


  // mobile search
  $('input#search-query-mobile').focus(function() { $(this).parent().addClass('focused'); });
  $('input#search-query-mobile').blur(function() {
    if (!$(this).val()) {
      $(this).parent().removeClass('focused');
    }
  });


  if($('#cd-search').length) {
    $('.cd-search-trigger-desktop').show();
  }
  //open search form
  $('#searchDesktop').unbind('click').click(function(e){
    e.preventDefault();
    toggleSearch('open');
  });

  $('#searchMobile').unbind('click').click(function(e){
    e.preventDefault();
    toggleSearch('mobile');
  });

  $('.cd-overlay').unbind('click').click(function(e){
    toggleSearch('close');
    $('.cd-overlay').removeClass('is-visible-mobile');
    $('.cd-search-trigger-mobile').removeClass('search-is-visible');
  });

  function toggleSearch(type) {

    switch (type) {
      case 'close':
        $('.cd-search').removeClass('is-visible');
        $('.cd-search-mobile').removeClass('is-visible-mobile');
        $('#searchDesktop, #searchDesktop').removeClass('search-is-visible');
        $('.cd-overlay').removeClass('search-is-visible');
      break;

      case 'mobile':
        $('.cd-search-mobile').toggleClass('is-visible-mobile');
        $('.cd-search-trigger-mobile').toggleClass('search-is-visible');

        $('.cd-search').toggleClass('is-visible');
        $('.cd-search-trigger').toggleClass('search-is-visible');

        $('.cd-overlay').toggleClass('search-is-visible');
        ($('.cd-search-mobile').hasClass('is-visible-mobile')) ? $('.cd-overlay').addClass('is-visible-mobile'): $('.cd-overlay').removeClass('is-visible-mobile');
        setTimeout(function(){$('.mobile-main-search__search').focus();},200); // Need to give time for the element to be visible
      break;

      default:
        $('.cd-search').toggleClass('is-visible');
        $('.cd-search-trigger').toggleClass('search-is-visible');

        $('.cd-search-mobile').toggleClass('is-visible-mobile');
        $('.cd-search-trigger-mobile').toggleClass('search-is-visible');
        
        setTimeout(function(){$('.desktop-main-search__search').focus();},200); // Need to give time for the element to be visible
        // $('.cd-overlay').toggleClass('search-is-visible');
      break;

    }

  }


 // $('body').addClass("loaded");


 if($('#mobile-menu-container').length) {
    $('#mobile-menu-tabs').show();
    $('#mobile-menu-name').prependTo('#tab-mobile-global-menu');
    //$('#mobile-menu-home').prependTo('#mobile-page-menu');
    $('#mobile-menu-item-container').prependTo('#mobile-page-menu');
 } else {
    $('#mobile-menu-tabs ul li:nth-child(2) a').removeClass('active');
    $('#mobile-menu-tabs ul li:first-child a').addClass('active');
  };



 var $sections = $('.spacing');

  $(window).scroll(function() {
    sticky_relocate();





    if($('.pageNavigation, .navigation-highlight').length){

      //page navigation...highlight current section
      var currentScroll = $(this).scrollTop();
      var scrollPosition = $(window).scrollTop();
      var $currentSection

      $sections.each(function(){

        var sectionTop = $(this).offset().top -200;

        // if the user has scrolled over the top of the section
        if (scrollPosition >= sectionTop) {

          var divPosition = $(this).offset().top -180;

          if( divPosition - 1 < currentScroll ){
            $currentSection = $(this);

            var id = $currentSection.attr('id');

            $('li').removeClass('page-highlight-section');
            $('.pageNavigation a').removeClass('active');
            $('.pageNavigation').removeClass('indicator');

            $(".pageNavigation [data-section=#"+id+"]").addClass('page-highlight-section');



          }



        }

      });

    };


});

  //weather widget for dashboard
if($('.dashboard').length) {

  $.simpleWeather({
    woeid: '',
    location: 'Miami, FL',
    unit: 'f',
    success: function(weather) {
      html = '<h1 class="icon-'+weather.code+'"></h1>';
      html += '<h2>'+weather.temp+'°</h2>';
      html += '<li class="currently">'+weather.currently+'</li></ul>';
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });

}


// page navigation slide to section
   $('.pageNavigationContainer .page-navigation__item, .pageNavigationContainer-hidden .page-navigation__item, .pageNavigation-mobile li, .service-list-tab-container-mobile li, .banner-initiatives-navigation li, .banner-initiatives-navigation-hidden li, .page-navigation-slide li').on('click', 'a', function (e) {

    e.preventDefault();

    $('li').removeClass('page-highlight-section');

        var toGo = $(this).data('section');

        if(window.innerWidth < '601') {

          if($('.service-list-tab-container-mobile li').length){
            $('html,body').animate({
              scrollTop: $('#' + toGo).offset().top -60},
              'slow', function() {
                focusFunction();
              }); 

          } else {
            $('html,body').animate({
              scrollTop: $('#' + toGo).offset().top},
              'slow', function() {
                focusFunction();
              });
          }

        } else {

          if ($('.banner-initiatives-navigation li, .banner-initiatives-navigation-hidden li').length) {
            $('html,body').animate({
              scrollTop: $('#' + toGo).offset().top -180},
              'slow', function() {
                 focusFunction();
              });
          } else {
            $('html,body').animate({
              scrollTop: $('#' + toGo).offset().top -140},
              'slow', function() {
                focusFunction();
              });

          }

        };

        function focusFunction(){$('#' + toGo + ' a').first().focus();}
    });

  // capture click on search icon - check width again in case of screen size change
  $('#global-icon-search a').on('click',function(e){

    $('#main-container').removeClass('profile-sub-active');

    $('#global-icon-search').toggleClass('search-sub-active');

    // handle focus of search input
    if ($('#global-icon-search').hasClass('search-sub-active')) {
      // set timeout doesn't seem to be working on mobile !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      setTimeout(function(){searchFocus()},600);
    } else {
      $('#search-query, #search-query-mobile').blur();
    };

    e.preventDefault();
  });

  function searchFocus(){
    $('#search-query, #search-query-mobile').focus()
  }

  // search functionality
  $("#search-query").keypress(function(e){
    if(e.which == 13 && e.target.value != ""){
      window.location = '//www.miamidade.gov/search/home.asp#gsc.tab=0&gsc.q=' + escape(e.target.value);
    }
  });

  $("#search-button").on('click', function(e){
    var value = $("#search-query").val();
    if(value)
      window.location = '//www.miamidade.gov/search/home.asp#gsc.tab=0&gsc.q=' + escape(value);
  });


  //checking to see where the user is; Employee or Global
  var pathArray = window.location.pathname.split('/');
  var employeeLevelLocation = pathArray[1];




  //global navigation; checking if livesite-test to update form action
  try {
    if (location.host.startsWith('livesite-test.')) {


      if(employeeLevelLocation.indexOf('employee') != -1){
        //the action needs to be added with JavaScript, if not, LiveSite will replace it
        $("#cd-search > form, #cd-search-mobile > form").attr("action", "https://livesite-test.miamidade.gov/employee/search.page");
      } else {
        //the action needs to be added with JavaScript, if not, LiveSite will replace it
        $("#cd-search > form, #cd-search-mobile > form").attr("action", "https://livesite-test.miamidade.gov/global/navigation/global-search.page");
      }

    } else {
      if(employeeLevelLocation.indexOf('employee') != -1){
        //the action needs to be added with JavaScript, if not, LiveSite will replace it
        $("#cd-search > form, #cd-search-mobile > form").attr("action", "https://secure.miamidade.gov/employee/search.page");
      } else {
        //the action needs to be added with JavaScript, if not, LiveSite will replace it
        $("#cd-search > form, #cd-search-mobile > form").attr("action", "https://www.miamidade.gov/global/navigation/global-search.page");
      }
    }
  } catch (err) {
    console.error(err);
  }









  // Initialization of mobile menu

  if($(".button-collapse").length) {
    $(".button-collapse").sideNav();
  }


  //close mobile menu button

$('.close-mobile-menu').on('click', function(){
  $(".button-collapse").sideNav('hide');
});


  // mobile search
  $('input#search-query-mobile').focus(function() { $(this).parent().addClass('focused'); });
  $('input#search-query-mobile').blur(function() {
    if (!$(this).val()) {
      $(this).parent().removeClass('focused');
    }
  });




    //mobile jquery ------------

    var mobileMenu = $('#mobile-menu').unbind();

    mobileMenu.on('click', function(e) {
      e.preventDefault();

      $('.mobile-global-nav').addClass('active');

    });

    $('#mobile-global-close').on ('click', function(e){
      e.preventDefault();
      $('.mobile-global-nav').removeClass('active');
    });




 // $('select').material_select();


if (window.innerWidth < '601'){

  //mobile targeting to close Service List Filters
  $('body').on('touchstart',function(event) {
    if (!$(event.target).closest('.search-filters').length && !$(event.target).closest('.toggle-filter').length) {
        $('body').removeClass('show-filters');
    };
  });

  //close Filters on mobile once a filter is selected
  $('.collapsible a').on('click', function(){
        $('body').removeClass('show-filters');
    });

}

  //toggles Service List Filters
  $('.toggle-filter').on('click',function(e){
    $('body').toggleClass('show-filters');
    e.preventDefault();
  });



  //fixing bug with active class for the label
  $('body').on('click',function(){

    if($('input.service-record__services-query__search-bar').val()){
      $('input.service-record__services-query__search-bar + label').addClass('active');
    }

  });

  $('.collapsible-header').removeClass('active');




  sticky_relocate();
  // check width and order global nav ------------
  resizeId();
  // back to top button on every page
  doneResizing();
  // listen for resize event then fire doneResizing() ------------
  backToTop();
  //initialization of modals
  //$('.modal-trigger').leanModal();



});