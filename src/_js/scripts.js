

  var btnWrite = document.querySelector(".btn--map");
  var popupWrite = document.querySelector(".popup-writetous");
  var popup = document.querySelector(".popup-writetous__wrap");
  var closeWrite = document.querySelector(".popup-writetous__close");


  //  popup Write
if (btnWrite) {
  btnWrite.addEventListener("click", function(event) {
    event.preventDefault();
    popupWrite.classList.add("popup-writetous__static");
    popup.classList.add("popup-writetous__show");
    setTimeout(function(event) {
      popup.classList.remove("popup-writetous__show");
    // popupWrite.classList.add("popup-writetous__static");
  }, 1000);
  });

  closeWrite.addEventListener("click", function(event) {
    event.preventDefault();
  // popup.classList.remove("popup-writetous__show");
  popupWrite.classList.remove("popup-writetous__static");
});

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (popup.classList.contains("popup-writetous__show")) {
        popup.classList.remove("popup-writetous__show");
      }
      if (popupWrite.classList.contains("popup-writetous__static")) {
        popupWrite.classList.remove("popup-writetous__static");
      }
    }
  })
}