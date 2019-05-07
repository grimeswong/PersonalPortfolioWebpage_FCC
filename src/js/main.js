/**
  * This is the main JavaScript file
  */

$(document).ready(function() {
  // if (typeof jQuery != 'undefined') {
  //   // jQuery is loaded => print the version
  //   // alert($().jquery);
  //   console.log("Jquery version = " + $().jquery);
  // }

  $(window).scroll(function() {
    // console.log("Current Top = "+ $(window).scrollTop());
    // console.log("Welcome Top = " + $("#welcome-section").offset().top);
    // console.log("Project Top = " + $("#projects").offset().top);
    // console.log("Profile Top = " + $("#profile-link").offset().top);
    // console.log("Navbar height = " + $("#navbar").height());
    if ($(window).scrollTop() == $("#welcome-section").offset().top || $(window).scrollTop() <= $("#projects").offset().top - $("#navbar").height()) {
      $("#navbar").addClass("navbar-welcome");
      $("#navbar").removeClass("navbar-projects");
      $("#navbar").removeClass("navbar-profiles");
    } else if ($(window).scrollTop() >= $("#projects").offset().top && $(window).scrollTop() <= $("#profile-link").offset().top) {
      $("#navbar").addClass("navbar-projects");
      $("#navbar").removeClass("navbar-welcome");
      $("#navbar").removeClass("navbar-profiles");
    } else if ($(window).scrollTop() >= $("#profile-link").offset().top) {
      $("#navbar").addClass("navbar-profiles");
      $("#navbar").removeClass("navbar-welcome");
      $("#navbar").removeClass("navbar-projects");
    }

    /* Project tiles events */
    $(".project-text").mouseover(function() {
      $(this).parents(".project-overlay").addClass("project-box-hover");
    });

    $(".project-text").mouseleave(function() {
      $(this).parents(".project-overlay").removeClass("project-box-hover");
    });

  });

});
