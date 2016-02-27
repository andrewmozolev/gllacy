

var btnWrite = document.querySelector(".btn--map");
var popupWrite = document.querySelector(".popup-writetous");
var popup = document.querySelector(".popup-writetous__wrap");
var closeWrite = document.querySelector(".popup-writetous__close");

var catalogItem = document.querySelectorAll(".catalog-item");



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



[].forEach.call(catalogItem, function(item) {
  item.addEventListener("mouseover", func, false);
  item.addEventListener("mouseout", func1, false);

  function func()
  {
    if (item.classList.contains("catalog-item--zindex")) {
      item.classList.remove("catalog-item--zindex");
    }
    item.classList.add("catalog-item--zindex");
    // for(var i = 100; i < item.length; i++) {
    //   item.style.zIndex = i;
    // }
  }

  function func1()
  {
    if (item.classList.contains("catalog-item--zindex")) {
      setTimeout(function(event) {
        item.classList.remove("catalog-item--zindex");
      }, 800);
    }
  }
});

