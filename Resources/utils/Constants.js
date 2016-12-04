
Constants = function(){
	this.Constants = {
	    DEVICE_WIDTH : Ti.Platform.displayCaps.platformWidth,
        DEVICE_HEIGHT : Ti.Platform.displayCaps.platformHeight,
        DEVICE_ID : Titanium.Platform.getId(),
     
        PLATFORM : Ti.Platform.name,

        METHOD_POST: 'POST',
        METHOD_GET : 'GET',

  		SERVER_URL : "http://www.omdbapi.com/",
  		
        CURRENTWINDOW:null,
	};       
};
module.exports = Constants;