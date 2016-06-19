// $(function(){
	var latitude = 49.2827291;
	var longitude = -123.12073750000002;
	var map;
	var pos;
	var tempMarkers = [];
	var jsonArray = [];
	var marker;
	var daysBack = [15,10,5,4,3,2,1];
	var day = 15;

	var birdsData = {
		//---eBird API function call
		getData : function() {
			
			var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo_spp/recent?lng="+longitude.toFixed(2)+"&lat="+latitude.toFixed(2)+"&sci=Haliaeetus%20leucocephalus&dist=50&back="+day+"&maxResults=25&locale=en_US&fmt=json&includeProvisional=true";
			$.getJSON(eBirdUrl, function (data) {
				console.log(data);
      			var birdPoints = data.length;        
      			for(var i = 0; i< birdPoints; i++){
      				var locPrivate;
      				if (data[i].locationPrivate === true){
      					locPrivate = 'Private';
      				}else{
      					locPrivate = "Public";
      				};
         			jsonArray.push({
         				birdID: i,
        				birdLocName: data[i].locName.substring(0, 35)+'.',
        				birdName: data[i].comName,
        				birdSights: data[i].howMany,
        				birdLat: data[i].lat,
        				birdLng: data[i].lng,
        				birdLocPrivate: locPrivate,
        				birdLocID: data[i].locID,
        				birdObsDate: data[i].obsDt,
        				birdSciName: data[i].sciName,
        				marker: new google.maps.Marker({
							position: new google.maps.LatLng(data[i].lat, data[i].lng),
							title: data[i].locName,
							animation: google.maps.Animation.DROP,
							map: map,
							infowindow: new google.maps.InfoWindow({
								content: '<h3 id="infoTitle">Bald Eagle Sightings</h3><strong>Observation Date: </strong>'+data[i].obsDt+
        							'<br/><strong>Location: </strong>'+data[i].locName+'<br/><strong>Number of Eagles: </strong>'+data[i].howMany+
        							'<br/><strong>Type of Property: </strong>'+locPrivate+
        							'<br/><a href="https://maps.google.com/?daddr='+data[i].lat+','+data[i].lng+'" target="_blank">Directions</a>'
							})
						})
        			});
				}
				viewModel.eBirdData(jsonArray);
				//When call gets made but no data is reported for that area
				if (birdPoints === 0){
					viewModel.dataInfo('Sorry, there are no Bald Eagels reports in this area. Try a different place or incrementing the number of days in your search')
				}else{
					viewModel.dataInfo('');
				}
				googleMap.mapMarkers(viewModel.eBirdData());
			})
			//Handling API call error put code below  
			.error(function(){
				viewModel.dataInfo('Sorry, something went rong with this search. Please try later')
			}) ;
		}
	};

	var viewModel = {
		eBirdData : ko.observableArray([]),
		placeLoc : ko.observable('Vancouver, BC'),
		dataInfo : ko.observable(),	
		query: ko.observable(''),
		days: ko.observableArray(daysBack),
		selectedDay: ko.observable(),
		search: function(){
			day = viewModel.selectedDay();
			var geocoder = new google.maps.Geocoder();
			googleMap.geocodeAddress(geocoder, map);

		}
	};
	
	viewModel.searchLoc = ko.computed(function() {
		//In order to access the underlying array and iterate it (just like any other JavaScript array) I declare the observableArray inside a variable
		var innerArrray = viewModel.eBirdData();
		var search = viewModel.query().toLowerCase();
	        return ko.utils.arrayFilter(innerArrray, function(value) {
	            	return value.birdLocName.toLowerCase().indexOf(search) >= 0;
	        });
    }, viewModel);

	var googleMap = {
		//Initiate Google Maps
		initMap : function(){
			birdsData.getData();
			googleMap.mapMarkers(viewModel.eBirdData());
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
		},
		//---Geocoding seached place, and calling API to generate new data
		geocodeAddress : function(geocoder, resultsMap) {

			var address = document.getElementById('address').value;
			geocoder.geocode({'address': address}, function(results, status) {
				viewModel.eBirdData.removeAll(); 
				googleMap.clearMarkers();
				googleMap.mapMarkers(viewModel.eBirdData());
				if (status === google.maps.GeocoderStatus.OK) {
					pos = results[0].geometry.location;
					resultsMap.setCenter(pos);
					latitude = results[0].geometry.location.lat();
					longitude = results[0].geometry.location.lng();
					googleMap.mapMarkers(viewModel.eBirdData());
					birdsData.getData();
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		},
		//---Generating new markers using eBird API data
		mapMarkers : function(array) {
			$.each(array, function(index, value) {
				var latitude = value.birdLat,
					longitude = value.birdLng,
					id = value.birdID,
					thisBird = value.birdName,
					thisDate = value.birdObsDate,
					thisLocation = value.birdLocName,
					marker = value.marker
				tempMarkers.push(marker);
				google.maps.event.addListener(marker, 'click', function() {
					marker.infowindow.open(map, marker);
				});
				google.maps.event.addListener(map, 'click', function() {
					marker.infowindow.close();
				}) ;
				
			});
			//Adjusting map view to see all markers found
			var bounds = new google.maps.LatLngBounds();
			for (var i = 0; i < tempMarkers.length; i++) {
				bounds.extend(tempMarkers[i].getPosition());
				map.fitBounds(bounds);
			}
		},

		clearMarkers : function(){
			for (var i = 0; i < tempMarkers.length; i++ ) {
				tempMarkers[i].setMap(null);
			}
			tempMarkers.length = 0;
		}

	};

		//Click on item in list view
	  viewModel.listViewClick = function(bird) {
	  	console.log(bird);
	    if (bird.birdLocName) {
	    	marker = this.marker
	    	this.marker.infowindow.open(map, marker);
	    	map.setZoom(12);
	    	map.setCenter(marker.getPosition());
	    }
	  };

	ko.applyBindings(viewModel);
	googleMap.initMap();

	
// });


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