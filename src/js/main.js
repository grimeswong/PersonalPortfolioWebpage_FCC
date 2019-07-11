/**
  * This is the main JavaScript file
  */

$(document).ready(function() {  // Run after the document is loaded

  $(window).scroll(function() {
    if ($(window).scrollTop() == $("#welcome-section").offset().top || $(window).scrollTop() <= $("#projects").offset().top - $("#navbar").height()) {
      $("#navbar").addClass("navbar-welcome");
      $("#navbar").removeClass("navbar-projects");
      $("#navbar").removeClass("navbar-profiles");
    } else if ($(window).scrollTop() >= $("#projects").offset().top && $(window).scrollTop() <= $("#profile-links").offset().top) {
      $("#navbar").addClass("navbar-projects");
      $("#navbar").removeClass("navbar-welcome");
      $("#navbar").removeClass("navbar-profiles");
    } else if ($(window).scrollTop() >= $("#profile-links").offset().top) {
      $("#navbar").addClass("navbar-profiles");
      $("#navbar").removeClass("navbar-welcome");
      $("#navbar").removeClass("navbar-projects");
    }

  });

  $(window).resize(function() {
    if($(window).outerWidth() >= 768) {
      $(".navbar-links").css("display", "flex");
    } else {
      $(".navbar-links").css("display", "none");
    }
  });

  /* Navbar mobile view event */
  $(".open-btn").on("click", function() {
    $(".navbar-links").toggle();
  });

  $(".navbar-link").on("click", function() {
    if($(window).outerWidth() < 768){
      $(".navbar-links").toggle();
    }
  })

  /* Project tiles events */
  $(".project-text").mouseover(function() {
    $(this).parents(".project-overlay").addClass("project-box-hover");
  });

  $(".project-text").mouseleave(function() {
    $(this).parents(".project-overlay").removeClass("project-box-hover");
  });


  /* Profile links events */
  $(".profile-link-icon").hover(function() {
    $(this).siblings("p").css("visibility", "visible");
  }, function() {
    $(this).siblings("p").css("visibility", "hidden");
  });

});
