// $(function(){
	var latitude = 49.2827291;
	var longitude = -123.12073750000002;
	var map;
	var pos;
	var tempMarkers = [];
	var jsonArray = [];
	var marker;
	
	var birdsData = {
		//---eBird API function call
		getData : function() {
			
			var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo_spp/recent?lng="+longitude.toFixed(2)+"&lat="+latitude.toFixed(2)+"&sci=Haliaeetus%20leucocephalus&dist=50&back=15&maxResults=25&locale=en_US&fmt=json&includeProvisional=true";
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
        				contentString : '<h4 id="infoTitle">Bald Eagle Sightings</h4><strong>Observation Date: </strong>'+data[i].obsDt+
        				'<br/><strong>Location: </strong>'+data[i].locName+'<br/><strong>Number of Eagles: </strong>'+data[i].howMany+
        				'<br/><strong>Type of Property: </strong>'+locPrivate+
        				'<br/><a href="https://maps.google.com/?daddr='+data[i].lat+','+data[i].lng+'" target="_blank">Directions</a>'

        			});
				}
				viewModel.eBirdData(jsonArray);
				//When call gets made but no data is reported for that area
				if (birdPoints === 0){
					viewModel.dataInfo('Sorry, there are no Bald Eagels reports in this area')
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
		// listViewClick : function() {
	 //    	console.log('You have clicked marker #' + viewModel.eBirdData().birdLocName);
	 //    }
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
				googleMap.geocodeAddress(geocoder, map)}
			});
			googleMap.mapMarkers(viewModel.eBirdData());
			viewModel.eBirdData();
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
					geoLoc = new google.maps.LatLng(latitude, longitude),
					thisBird = value.birdName,
					thisDate = value.birdObsDate,
					thisLocation = value.birdLocName,
					thisContent = value.contentString,
					marker = new google.maps.Marker({
						position: geoLoc,
						title: thisLocation,
						animation: google.maps.Animation.DROP,
						map: map
					});
				tempMarkers.push(marker);
				var infowindow = new google.maps.InfoWindow({
					content: thisContent
				});
				marker.addListener('click', function() {
					infowindow.open(map, marker);
				});
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
	    	var latitude = this.birdLat;
			var	longitude = this.birdLng;
			var geoLoc = new google.maps.LatLng(latitude, longitude);
	    	marker = new google.maps.Marker({
	    				position: geoLoc,
						title: this.birdLocName,
						map: map
					});
	    	var infowindow = new google.maps.InfoWindow({
					content: this.contentString
				});
	    	infowindow.open(map, marker);
	    	map.setZoom(12);
	    	map.setCenter(marker.getPosition());

	   //  	var geoLoc
	   //  	var marker = new google.maps.Marker({
				// 		position: geoLoc,
				// 		title: thisLocation,
				// 		animation: google.maps.Animation.DROP,
				// 		map: map
				// 	});
	   //    	var infowindow = new google.maps.InfoWindow({
				// 	content: this.birdID + '</br>' + this.birdName + '</br>' + this.birdObsDate + '</br>' + this.birdObsDate.substring(0, 40)
				// });
				// marker.addListener('click', function() {
				// 	infowindow.open(map, marker);
				// });
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