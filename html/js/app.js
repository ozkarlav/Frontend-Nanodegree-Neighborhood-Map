// $(function(){
	
	var latitude = 43.001044; 
	var longitude = -81.241073;
	var map;
	var pos;
	var tempMarkers = [];
	var jsonArray = [];
	var iconImg = 'images/eagle';
	var marker;
	var daysBack = [15,10,5,4,3,2,1];
	var day = 15;
	var birdsData = {
		myEagles : function(){
			jsonArray.push({
				birdID: 1,
				birdName:"Bald Eagle",
				birdSights:2,
				birdLat:42.950497, 
				birdLng:-81.402960,
				birdLocID:"L282714",
				birdLocName:"Komoka Park",
				birdLocPrivate:false,
				birdObsDate:"2016-05-13 15:30",
				birdSciName:"Haliaeetus leucocephalus",
				marker: new google.maps.Marker({
								position: new google.maps.LatLng(42.950497, -81.402960),
								title: "Komoka Park",
								icon: iconImg+'Default.png',
								animation: google.maps.Animation.DROP,
								map: map,
								infowindow: new google.maps.InfoWindow({
									content: '<h3 id="infoTitle">My Bald Eagle Sightings</h3><strong>Observation Date: </strong>2016-05-13 15:30<br/><strong>Location: </strong>Komoka Park<br/><strong>Number of Eagles: </strong>2<br/><strong>Type of Property: </strong>Public<br/><a href="https://maps.google.com/?daddr=42.950497,-81.402960" target="_blank">Directions</a>'
								})
							})
			
			},
			{
				birdID: 2,
				birdName:"Bald Eagle",
				birdSights:1,
				birdLat:42.971479,
				birdLng:-81.291974,
				birdLocID:"L282714",
				birdLocName:"Springbank Park",
				birdLocPrivate:false,
				birdObsDate:"2016-06-16 14:30",
				birdSciName:"Haliaeetus leucocephalus",
				marker: new google.maps.Marker({
								position: new google.maps.LatLng(42.971479, -81.291974),
								title: "Springbank Park",
								icon: iconImg+'Default.png',
								animation: google.maps.Animation.DROP,
								map: map,
								infowindow: new google.maps.InfoWindow({
									content: '<h3 id="infoTitle">My Bald Eagle Sightings</h3><strong>Observation Date: </strong>2016-06-16 14:30<br/><strong>Location: </strong>Springbank Park<br/><strong>Number of Eagles: </strong>1<br/><strong>Type of Property: </strong>Public<br/><a href="https://maps.google.com/?daddr=42.971479,-81.291974" target="_blank">Directions</a>'
								})
							})
			},
			{
				birdID: 3,
				birdName:"Bald Eagle",
				birdSights:1,
				birdLat:43.041009, 
				birdLng:-81.184877,
				birdLocID:"L282714",
				birdLocName:"Fanshawe Park",
				birdLocPrivate:false,
				birdObsDate:"2016-05-06 9:30",
				birdSciName:"Haliaeetus leucocephalus",
				marker: new google.maps.Marker({
								position: new google.maps.LatLng(43.041009, -81.184877),
								title: "Fanshawe Park",
								icon: iconImg+'Default.png',
								animation: google.maps.Animation.DROP,
								map: map,
								infowindow: new google.maps.InfoWindow({
									content: '<h3 id="infoTitle">My Bald Eagle Sightings</h3><strong>Observation Date: </strong>2016-05-06 9:30<br/><strong>Location: </strong>Fanshawe Park<br/><strong>Number of Eagles: </strong>1<br/><strong>Type of Property: </strong>Public<br/><a href="https://maps.google.com/?daddr=43.041009,-81.184877" target="_blank">Directions</a>'
								})
							})
			},
			{
				birdID: 4,
				birdName:"Bald Eagle",
				birdSights:2,
				birdLat:43.012165, 
				birdLng:-81.269242,
				birdLocID:"L282714",
				birdLocName:"Western University",
				birdLocPrivate:false,
				birdObsDate:"2016-03-18 18:30",
				birdSciName:"Haliaeetus leucocephalus",
				marker: new google.maps.Marker({
								position: new google.maps.LatLng(43.012165, -81.269242),
								title: "Western University",
								icon: iconImg+'Default.png',
								animation: google.maps.Animation.DROP,
								map: map,
								infowindow: new google.maps.InfoWindow({
									content: '<h3 id="infoTitle">My Bald Eagle Sightings</h3><strong>Observation Date: </strong>2016-03-18 18:30<br/><strong>Location: </strong>Western University<br/><strong>Number of Eagles: </strong>2<br/><strong>Type of Property: </strong>Public<br/><a href="https://maps.google.com/?daddr=43.012165,-81.269242" target="_blank">Directions</a>'
								})
							})
			},
			{
				birdID: 5,
				birdName:"Bald Eagle",
				birdSights:2,
				birdLat:42.945509,
				birdLng:-81.191275,
				birdLocID:"L282714",
				birdLocName:"Pond Mills",
				birdLocPrivate:false,
				birdObsDate:"2016-02-18 11:30",
				birdSciName:"Haliaeetus leucocephalus",
				marker: new google.maps.Marker({
								position: new google.maps.LatLng(42.945509, -81.191275),
								title: "Pond Mills",
								icon: iconImg+'Default.png',
								animation: google.maps.Animation.DROP,
								map: map,
								infowindow: new google.maps.InfoWindow({
									content: '<h3 id="infoTitle">My Bald Eagle Sightings</h3><strong>Observation Date: </strong>2016-02-18 11:30<br/><strong>Location: </strong>Pond Mills<br/><strong>Number of Eagles: </strong>2<br/><strong>Type of Property: </strong>Public<br/><a href="https://maps.google.com/?daddr=42.945509,-81.191275" target="_blank">Directions</a>'
								})
							})
			});
			viewModel.eBirdData(jsonArray);
			viewModel.listTitle('My Bald Eagle Sightings');
			googleMap.mapMarkers(viewModel.eBirdData());
		},
		//---eBird API function call
		getData : function() {
			
			var eBirdUrl = "http://ebird.org/ws1.1/data/obs/geo_spp/recent?lng="+longitude.toFixed(2)+"&lat="+latitude.toFixed(2)+"&sci=Haliaeetus%20leucocephalus&dist=50&back="+day+"&maxResults=25&locale=en_US&fmt=json&includeProvisional=true";
			$.getJSON(eBirdUrl, function (data) {
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
							icon: iconImg+'Default.png',
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
					viewModel.dataInfo('Sorry, there are no Bald Eagles reports in this area. Try a different place or incrementing the number of days in your search')
				}else{
					viewModel.dataInfo('');
				}
				googleMap.mapMarkers(viewModel.eBirdData());
			})
			//Handling API call error put code below  
			.error(function(){
				viewModel.dataInfo('Sorry, something went wrong with this search. Please try later')
			}) ;
		}
	};

	var viewModel = {
		eBirdData : ko.observableArray([]),
		placeLoc : ko.observable('London, ON'),
		dataInfo : ko.observable(),	
		query : ko.observable(''),
		days : ko.observableArray(daysBack),
		selectedDay: ko.observable(),
		listTitle : ko.observable(''),
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
	    	value.marker.setVisible(false);
	    	if(value.birdLocName.toLowerCase().indexOf(search) >= 0) {
	    		value.marker.setVisible(true);
	    		return value.birdLocName.toLowerCase().indexOf(search) >= 0;
	    	};

	        });
	    
    }, viewModel);

	var googleMap = {
		//Initiate Google Maps
		initMap : function(){
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
			 birdsData.myEagles();
			 googleMap.mapMarkers(viewModel.eBirdData());
			
		},
		//---Geocoding seached place, and calling API to generate new data
		geocodeAddress : function(geocoder, resultsMap) {
			var address = document.getElementById('address').value;
			geocoder.geocode({'address': address}, function(results, status) {
				viewModel.query('');
				viewModel.eBirdData.removeAll(); 
				googleMap.clearMarkers();
				googleMap.mapMarkers(viewModel.eBirdData());
				if (status === google.maps.GeocoderStatus.OK) {
					pos = results[0].geometry.location;
					resultsMap.setCenter(pos);
					latitude = results[0].geometry.location.lat();
					longitude = results[0].geometry.location.lng();
					googleMap.mapMarkers(viewModel.eBirdData());
					viewModel.listTitle('Search results...');
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

	    if (bird.birdLocName) {
	    	marker = this.marker;
	    	marker.infowindow.open(map, marker);
	    	map.setZoom(14);
	    	map.setCenter(marker.getPosition());
	    }
	  };

	  viewModel.mouseOver = function(bird){
	  	if (bird.birdLocName) {
	    	marker = this.marker;
	    	marker.icon
	    	marker.setAnimation(google.maps.Animation.BOUNCE);
	    	marker.setIcon(iconImg+'Selected.png');
	    }
	  };

	  viewModel.mouseOut = function(bird){
	  	if (bird.birdLocName) {
	    	marker = this.marker
	    	marker.setAnimation(null);
	    	marker.setIcon(iconImg+'Default.png');
	    }
	  };

	ko.applyBindings(viewModel);
	googleMap.initMap();

	
// });


//Clear icon inside input text
//stackoverflow.com/questions/6258521/clear-icon-inside-input-text

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