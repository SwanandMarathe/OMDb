var HEIGHT = Ti.Platform.displayCaps.platformHeight;
var WIDTH = Ti.Platform.displayCaps.platformWidth;
// alert(HEIGHT +" : "+WIDTH);
var xratio = 3.2;
var yratio = 4.8;
// if((HEIGHT == 480 && WIDTH == 320) || (HEIGHT == 568 && WIDTH == 320) || 
	// (HEIGHT == 800 && WIDTH == 480) || (HEIGHT == 960 && WIDTH == 540) || 
	// (HEIGHT == 1184 && WIDTH == 720) || (HEIGHT == 1280 && WIDTH == 720) || 
	// (HEIGHT == 1920 && WIDTH == 1080)){
	xratio = Titanium.Platform.displayCaps.platformWidth/100;
	yratio = Titanium.Platform.displayCaps.platformHeight/100;
// }
	
var fontType = 'Helvetica';
var viewsArray = [];

var slideDetailInAni = Ti.UI.createAnimation({
	left : 0*xratio,
	duration : 200,
	autoreverse : false,
});
var slideDetailOutAni = Ti.UI.createAnimation({
	left : 100*xratio,
	duration : 200,
	autoreverse : false,
});

var AppWindow = Ti.UI.createWindow({
	backgroundColor : 'white',
	fullscreen : true,
});

AppWindow.allBaseView = Ti.UI.createView({
	height : 100*yratio,
	width : 100*xratio,
	backgroundColor : 'transparent',
	opacity : 1,
	zIndex : 50
});
AppWindow.add(AppWindow.allBaseView);

AppWindow.invisibleView = Ti.UI.createView({
	top : 10.41*yratio,
	bottom : 0*yratio,
	width : 100*xratio,		
	backgroundColor : '#00ffffff',
	opacity : 1,
	zIndex : 100
});

function addInvisibleView(){
	AppWindow.allBaseView.add(AppWindow.invisibleView);
}

function removeInvisibleView(){
	AppWindow.allBaseView.remove(AppWindow.invisibleView);
}

var AppControllerPath = new (require('appcontroller'));
var appControllerPath = AppControllerPath.AppController;
// alert('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);

// Created Global Constant and bind to global App variable
var globalConstant = new (require('utils/Constants'));
var Constants = globalConstant.Constants;
    
var ViewManager = new (require(appControllerPath.VIEWMANAGER));
// var DatabaseManager = new (require(appControllerPath.DATABASEMANAGER));

// DatabaseManager.createTable();
ViewManager.loadNextController(appControllerPath.FIRSTCONTROLLER);

AppWindow.open();

function closeCurrentWindow(){
	var currView = viewsArray.pop();
	currView.animate(slideDetailOutAni);
	setTimeout(function(){ViewManager.removeView(currView);},200);
}

AppWindow.addEventListener('android:back',function(){
	if(viewsArray.length == 0){
		var activity = Ti.Android.currentActivity;
		activity.finish();
	}else{
		closeCurrentWindow();
	}
});
// AppWindow.addEventListener('focus',function(){AppWindow.fullscreen = true; AppWindow.navBarHidden = true;});
