

function pageOnLoad() {

  var centerLatLng = new google.maps.LatLng(59.939069, 30.329004);
  var markerLatLng = new google.maps.LatLng(59.938770, 30.323075);

  var mapOptions = {

    zoom: 16,
    draggable: true, // если false, карту нельзя перемещять. Перемещение включено, по умолчанию.
    center: centerLatLng,
    scrollwheel: false, // false, скролл отключен.

    mapTypeId: google.maps.MapTypeId.ROADMAP

  }

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var image = new google.maps.MarkerImage(
    'img/img_map-marker.png',
    new google.maps.Size(218,142),
    new google.maps.Point(0,0),
    new google.maps.Point(40,142)
    );

  var marker = new google.maps.Marker({

    map: map,
    icon: image,
    position: markerLatLng,
    title: 'HTML Academy'
  });
}