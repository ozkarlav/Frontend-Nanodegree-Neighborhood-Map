(function getFlickrImgData (){
    var photoSearchURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=98fb0f1ac7a877fa9e393a791a52f270&photo_id=23849491765&format=json&nojsoncallback=1&auth_token=72157665622691333-f02a7c64b27c2010&api_sig=4382bf437ad584b4aae6b6bf29bfa2fa';
    console.log(photoSearchURL)
    var datos;
    //console.log(self.eBirdData());
    // $.getJSON(photoSearchURL, function (data) {
    //     datos = data;
    //     // ownerUrl = "https://www.flickr.com/photos/"+data.photo.owner.nsid+"/";
    //     // userName = data.photo.owner.username; 
    // });
    
    $.ajax({
      url: photoSearchURL,
      dataType: 'json',
      success: function(data) {
        datos = data;
        console.log(data);
      }
    });
    console.log(datos);
  })();

