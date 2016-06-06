function appViewModel() {
  //Initial coordinates
  var latitude = 49.2827291;
  var longitude = -123.12073750000002;
  var tempMarkers = [];
  var infoWindow = null;
  var map;
  var self = this;
  //Array from the eBird API call
  self.eBirdData = ko.observableArray([]);
  self.placeLoc = ko.observable('Vancouver, BC');
  self.dataInfo = ko.observable();


  //API call to eBird.org
  function geteBirdData () { 
    self.eBirdData.removeAll();
    var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo_spp/recent?lng="+longitude.toFixed(2)+"&lat="+latitude.toFixed(2)+"&sci=Haliaeetus%20leucocephalus&dist=50&back=5&maxResults=25&locale=en_US&fmt=json&includeProvisional=true"
    $.getJSON(eBirdUrl, function (data) {
      var birdPoints = data.length;        
      for(var i = 0; i< birdPoints; i++){
          self.eBirdData.push({
            id: i,
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
    })
    //Handling API call error
    .error(function(){
      self.dataInfo('Sorry, something went rong with this search. Please try later')
    })  
  };

  //Initiate Google Maps
  function initMap() {
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
  };
  //Geocoding function, will locate seached place and call API to get new Data
  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        self.eBirdData();
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
  };

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
       infowindow.open(map, marker);
      });
    });
      
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < tempMarkers.length; i++) {
       bounds.extend(tempMarkers[i].getPosition());
       map.fitBounds(bounds);
      }
    };
  
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

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
};
