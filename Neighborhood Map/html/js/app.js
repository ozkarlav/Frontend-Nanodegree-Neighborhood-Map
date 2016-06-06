//flickr API
//https://api.flickr.com/services/rest/?method=flickr.photos.geo.photosForLocation&api_key=a3b9d07540656a7251c0862462f3ca1d&lat=49.2827291&lon=-123.12073750000002&per_page=1&page=1&format=json&nojsoncallback=1&auth_token=72157667570117682-4ca4513d9b43bb00&api_sig=d7a7c5f7e29c24cb271634d8e988372f


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

$(function(){

})


function appViewModel() {
  var self = this;
  var latitude = 49.2827291;
  var longitude = -123.12073750000002;
  var map;
  var pos;
  var infoWindow = null;
  var tempMarkers = [];
  self.filterTaskInput = ko.observable("");
  self.eBirdData = ko.observableArray([]);
  self.placeLoc = ko.observable('Vancouver, BC');
  self.dataInfo = ko.observable();

  //---eBird API function call
  function geteBirdData () { 
    self.eBirdData.removeAll();
    var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo_spp/recent?lng="+longitude.toFixed(2)+"&lat="+latitude.toFixed(2)+"&sci=Haliaeetus%20leucocephalus&dist=50&back=5&maxResults=25&locale=en_US&fmt=json&includeProvisional=true";
    $.getJSON(eBirdUrl, function (data) {
      var birdPoints = data.length;        
      for(var i = 0; i< birdPoints; i++){
          self.eBirdData.push({
            birdLocName: data[i].locName.substring(0, 38),
            birdName: data[i].comName,
            birdSights: data[i].howMany,
            birdLat: data[i].lat,
            birdLng: data[i].lng,
            birdLocID: data[i].locID,
            birdObsDate: data[i].obsDt,
            birdSciName: data[i].sciName,
           })
      }
      //When call gets made but no data is reported for that area
      if (data.length === 0){
        self.dataInfo('Sorry, there are no Bald Eagels reports in this area')
      }else{
        self.dataInfo('');
      }
      mapMarkers(self.eBirdData());
    })
    //Handling API call error
    .error(function(){
      self.dataInfo('Sorry, something went rong with this search. Please try later')
    })  
  };
  // this.filterTaskInput.subscribe(function(newValue) {
  //   searchLoc(newValue);
  // });
  function searchLoc(filter) {
    self.eBirdData.removeAll();
    for(var x in self.eBirdData){
      if (self.eBirdData[x].birdLocName.toLowerCase().indexOf(value.toLowerCase()) >= 0){
        self.eBirdData.birdLocName.push(self.eBirdData[x]);
      }
    }
    // filter = filter.toLowerCase();
    // self.eBirdData().forEach(function(value) {
    //   if (value.birdLocName.toLowerCase().indexOf(filter) > 0) {
    //     console.log('filtered');
    //     self.eBirdData.push(value);
    //   } else {
    //     console.log('unfiltered');
    //   }
    // });
  };
  self.filterTaskInput.subscribe(self.searchLoc);
  //Initiate Google Maps
  function initMap() {
    geteBirdData();
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
    mapMarkers(self.eBirdData());
  }

  //---Geocoding seached place, and calling API to generate new data
  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      self.eBirdData.removeAll();
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
  
  //---Generating new markers using eBird API data
  function mapMarkers(array) {
    $.each(array, function(index, value) {
      var latitude = value.birdLat,
          longitude = value.birdLng,
          geoLoc = new google.maps.LatLng(latitude, longitude),
          thisBird = value.birdName,
          thisDate = value.birdObsDate,
          thisLocation = value.birdLocName
      var marker = new google.maps.Marker({
        position: geoLoc,
        animation: google.maps.Animation.DROP,
        map: map,
      });
      
      tempMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: thisBird + '</br>' + thisDate + '</br>' + thisLocation.substring(0, 40)
      });
      marker.addListener('click', function() {
        map.setZoom(15);
        map.setCenter(geoLoc);
        infowindow.open(map, marker);
      });
    });
    //Adjusting map view to see all markers found
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < tempMarkers.length; i++) {
      bounds.extend(tempMarkers[i].getPosition());
      map.fitBounds(bounds);
    }
  };
  //Clears all Markers after a new search
  function clearMarkers() {
    for (var i = 0; i < tempMarkers.length; i++ ) {
      tempMarkers[i].setMap(null);
    }
    tempMarkers.length = 0;
  };

  initMap();
};

ko.applyBindings(new appViewModel());

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
