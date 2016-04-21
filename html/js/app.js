// Copyright 2014-2015 Twitter, Inc.
// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)

var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo/recent?lng=-81.526823&lat=45.192551&dist=7&back=8&maxResults=500&locale=en_US&fmt=json";
      // $.getJSON(eBirdUrl, function (data) {
      //   console.log(data);
      // }, 
      // function success(data){
      //   console.log(data);
      // });

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
};
// !--------------- VIEW MODEL -----------------!
//var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo/recent?lng=-81.52&lat=45.19&dist=7&back=8&maxResults=500&locale=en_US&fmt=json";
function appViewModel() {
  var self = this;
  self.eBirdList = ko.observableArray();

  $.getJSON(eBirdUrl, function (data) {
   
    self.eBirdList(data);
   console.log(data);
   //console.log(this.eBirdList);
  });
};
ko.applyBindings(new appViewModel());

//!---------------- GOOGLE MAP ------------------!

var marker;
var coordinates = {lat: 45.192551, lng: -81.526823};
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: coordinates
  });

  marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: coordinates
  });

  marker.addListener('mouseover', function(){
  	marker.setAnimation(google.maps.Animation.BOUNCE);
  });

  marker.addListener('mouseout', function(){
  	marker.setAnimation(null);
  });
}
// function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }


