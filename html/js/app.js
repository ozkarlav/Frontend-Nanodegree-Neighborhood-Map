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


function appViewModel() {
  var self = this;
  var latitude = 49.2827291;
  var longitude = -123.12073750000002;
  var map;
  var pos;
  var infoWindow = null;
  var userCords;
  var tempMarkers = [];
  self.eBirdData = ko.observableArray([]);
  self.locationName = ko.observableArray([]);
  self.placeLoc = ko.observable('Vancouver, BC')
 // self.mapMarkers = ko.observableArray([]);

  //---eBird API function call

  function geteBirdData () { 
    self.eBirdData.removeAll();
    self.locationName.removeAll();
    var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo_spp/recent?lng="+longitude.toFixed(2)+"&lat="+latitude.toFixed(2)+"&sci=Haliaeetus%20leucocephalus&dist=50&back=5&maxResults=15&locale=en_US&fmt=json&includeProvisional=true"
    $.getJSON(eBirdUrl, function (data) {
      var birdPoints = data.length;        
        for(var i = 0; i< birdPoints; i++){
            self.locationName.push({
              shortName: data[i].locName.substring(0, 40),
              fullLocName: data[i].locName
            });
            self.eBirdData.push({
              birdName: data[i].comName,
              birdSights: data[i].howMany,
              birdLat: data[i].lat,
              birdLng: data[i].lng,
              birdLocID: data[i].locID,
              birdLocName: data[i].locName,
              birdObsDate: data[i].obsDt,
              birdSciName: data[i].sciName
             })
      }
      mapMarkers(self.eBirdData());
      self.locationName.sort();
  })}
  //
  function initMap() {
    //geteBirdData();
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng (latitude, longitude),
      panControl: false,
      panControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      scaleControl: false
    });

    //Geocode from search on top of map.
    var geocoder = new google.maps.Geocoder();

    document.getElementById('address').addEventListener('keypress', function(e) {
      // Enter pressed?
      if(e.which == 10 || e.which == 13) {
        geocodeAddress(geocoder, map)}
      });
  }

    function geocodeAddress(geocoder, resultsMap) {
        //geteBirdData();
      var address = document.getElementById('address').value;
      geocoder.geocode({'address': address}, function(results, status) {
        self.eBirdData.removeAll();
        self.locationName.removeAll();
        clearMarkers();
        mapMarkers(self.eBirdData());
          if (status === google.maps.GeocoderStatus.OK) {
            pos = results[0].geometry.location;
            resultsMap.setCenter(pos);
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            mapMarkers(self.eBirdData());
            geteBirdData();
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
      });
    }

    function mapMarkers(array) {
      $.each(array, function(index, value) {
        var latitude = value.birdLat,
            longitude = value.birdLng,
            geoLoc = new google.maps.LatLng(latitude, longitude),
            thisBird = value.birdName,
            thisDate = value.birdObsDate;
        var marker = new google.maps.Marker({
          position: geoLoc,
          animation: google.maps.Animation.DROP,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });
        
        tempMarkers.push(marker);
        var infowindow = new google.maps.InfoWindow({
          content: thisBird + ', ' + thisDate,
        });
        marker.addListener('click', function() {
         infowindow.open(map, marker);
        });
      });
        
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < tempMarkers.length; i++) {
         bounds.extend(tempMarkers[i].getPosition());
         map.fitBounds(bounds);
        }
      }
    
    function clearMarkers() {
    for (var i = 0; i < tempMarkers.length; i++ ) {
      tempMarkers[i].setMap(null);
    }
    tempMarkers.length = 0;
    }


   
  // Create and place markers and info windows on the map based on data from API
    initMap();
    mapMarkers(self.eBirdData());
    geteBirdData();
  


};

ko.applyBindings(new appViewModel());

//!---------------- GOOGLE MAP ------------------!

// CLEARABLE INPUT
function tog(v){return v?'addClass':'removeClass';} 
$(document).on('input', '.clearable', function(){
    $(this)[tog(this.value)]('x');
}).on('mousemove', '.x', function( e ){
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
}).on('touchstart click', '.onX', function( ev ){
    ev.preventDefault();
    $(this).removeClass('x onX').val('').change();
});

$('.clearable').trigger("input");
// Uncomment the line above if you pre-fill values from LS or server
