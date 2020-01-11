setInterval(blinkText, 500);

$(document).on("keypress", function(event) {
  if (event.key === " ") {
    pageRedirect();
  }
});

function blinkText() {
  $(".instruction").fadeOut(700);
  $(".instruction").fadeIn(700);
};

function pageRedirect() {
  window.location.href = "game.html";
};
