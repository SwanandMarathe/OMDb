function ActivityIndicator() {
	this.showActivityIndicator = function(_titleText) {
		// AppWindow.baseView = Ti.UI.createView({
			// backgroundColor : 'transparent',
			// height : 100*yratio,
			// width : 100*xratio,
			// zIndex:101,
			// touchEnabled : false
		// });	
		// AppWindow.add(AppWindow.baseView);
		
		AppWindow.opacView = Ti.UI.createView({
			backgroundColor : 'black',
			height : 100*yratio,
			width : 100*xratio,
			opacity : 0.6,
			touchEnabled : false,
			zIndex : 102
		});
		AppWindow.add(AppWindow.opacView);
		
		AppWindow.activityIndicator = Ti.UI.createActivityIndicator({
			message : _titleText,
			style:  Titanium.UI.ActivityIndicatorStyle.BIG,
	        color: '#ffffff',
	        font : {fontSize : '16dp'},
			height : 100*yratio,
			width : 100*xratio,
			zIndex : 103
		});
		AppWindow.add(AppWindow.activityIndicator);
		AppWindow.activityIndicator.show();
	
	};
	
	this.hideActivityIndicator = function() {
		AppWindow.remove(AppWindow.opacView);
		AppWindow.remove(AppWindow.activityIndicator);
		// AppWindow.remove(AppWindow.baseView);
	};
};
module.exports = ActivityIndicator;