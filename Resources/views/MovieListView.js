function homeWindow(_movieListData) {
	Ti.API.info(JSON.stringify(_movieListData));
	var baseWindow = require(appControllerPath.BASEVIEW);
	var homeView = new createBaseView("Search Results",true,false);
	homeView.left = 100*xratio;
	
	homeView.movieTableView = Ti.UI.createScrollView({
		top : 10*yratio,
		bottom : 0*yratio,
		backgroundColor : '#ffffff',
		layout : 'horizontal',
		width : 100*xratio,
		contentHeight : Ti.UI.SIZE,
		contentWidth : 100*xratio,
		zIndex : 10
	});
	homeView.add(homeView.movieTableView);
	
	for(var i=0;i<_movieListData.Search.length;i++){
		var row = Ti.UI.createView({
			// backgroundColor : '#80d89200',
			height : 60*xratio,
			width : 50*xratio,
			data : _movieListData.Search[i],
			borderColor : '#ffffff',
			borderWidth : 1*xratio,
			bubbleParent : true
		});
		
		var moviePoster = Ti.UI.createImageView({
			height : 60*xratio,
			width : 50*xratio,
			image : _movieListData.Search[i].Poster,
			data : _movieListData.Search[i]
		});
		row.add(moviePoster);
		
		var titleView = Ti.UI.createView({
			bottom : 0*xratio,
			height : 16*xratio,
			backgroundColor : '#80000000',
			// touchEnabled : false
		});
		row.add(titleView);
		
		var lblTitle = Ti.UI.createLabel({
			color : '#ffffff',
			text : _movieListData.Search[i].Title,
			font : {fontSize : 4.25*xratio},
			lines : 2,
			ellipsize : true,
			textAlign : 'left',
			left : 5*xratio,
			right : 5*xratio,
			top : 1*xratio,
			touchEnabled : false
		});
		titleView.add(lblTitle);
		
		var lblYear = Ti.UI.createLabel({
			color : '#f5f5f5',
			text : 'Release Year : '+_movieListData.Search[i].Year,
			font : {fontSize : 3.25*xratio},
			ellipsize : true,
			textAlign : 'left',
			left : 5*xratio,
			right : 5*xratio,
			bottom : 1*xratio,
			touchEnabled : false
		});
		titleView.add(lblYear);
		homeView.movieTableView.add(row);
	}
	
	return homeView;
};
module.exports = homeWindow;