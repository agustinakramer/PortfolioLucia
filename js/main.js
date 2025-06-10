(function ($) {
  "use strict";

  // Navbar on scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".navbar").fadeIn("slow").css("display", "flex");
    } else {
      $(".navbar").fadeOut("slow").css("display", "none");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Typed Initiate
  if ($(".typed-text-output").length == 1) {
    var typed_strings = $(".typed-text").text();
    var typed = new Typed(".typed-text-output", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Scroll to Bottom
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scroll-to-bottom").fadeOut("slow");
    } else {
      $(".scroll-to-bottom").fadeIn("slow");
    }
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    var filter = $(this).data("filter");
    portfolioIsotope.isotope({ filter: filter });

    // Si se selecciona "Media", re-renderizamos Twitter y ajustamos layout
    if (filter === ".third") {
      setTimeout(function () {
        if (
          typeof twttr !== "undefined" &&
          twttr.widgets &&
          twttr.widgets.load
        ) {
          twttr.widgets.load();
        }
        portfolioIsotope.isotope("layout");
      }, 1000);
    }
  });

  // Reajustar Isotope cuando cargan los iframes (Telegram, etc.)
  $("iframe").on("load", function () {
    portfolioIsotope.isotope("layout");
  });

  // Reajustar cuando se carga todo (Twitter, imágenes, etc.)
  $(window).on("load", function () {
    setTimeout(function () {
      portfolioIsotope.isotope("layout");
      if (typeof twttr !== "undefined" && twttr.widgets && twttr.widgets.load) {
        twttr.widgets.load(); // Re-renderiza tweets si ya está el script cargado
      }
    }, 1500);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });
})(jQuery);
