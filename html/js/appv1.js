// var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo/recent?lng=-81.52&lat=45.19&dist=7&back=8&maxResults=500&locale=en_US&fmt=json";
//       $.getJSON(eBirdUrl, function (data) {
//         console.log(data);
//       }, 
//       function success(data){
//         console.log(data);
//       });

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
var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo/recent?lng=-81.52&lat=45.19&dist=7&back=8&maxResults=500&locale=en_US&fmt=json";

var eBirdList = function (){
      var birdData = []
      $.getJSON(eBirdUrl, function (data) {
        var birdPoints = data.length;
        for(var i = 0; i< birdPoints; i++){
          var comName = data[i].comName;
          var howMany = data[i].howMany;
          var lat = data[i].lat;
          var lng = data[i].lng;
          var locID = data[i].locID;
          var locName = data[i].locName;
          var locPrivate = data[i].locationPrivate;
          var obsDt = data[i].obsDt;
          var obsReviewed = data[i].obsReviewed;
          var obsValid = data[i].obsValid;
          var sciName = data[i].sciName;

          birdData.push({
            birdName: comName,
            birdSights: howMany,
            birdLat: lat,
            birdLng: lng,
            birdLocID: locID,
            birdLocName: locName,
            birdObsDate: obsDt,
            birdSciName: sciName
          })
        }
        console.log(birdData);
      });
      
    }
    eBirdList();

function appViewModel() {
  var self = this;
  var eBirdLocations = [];

  // this.eBirdList = ko.observableArrray([]);
  //console.log(this.eBirdList);
    
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


