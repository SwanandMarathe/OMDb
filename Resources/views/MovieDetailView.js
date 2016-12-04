function movieDetailWindow(_movieData) {
	Ti.API.info(JSON.stringify(_movieData));
	var baseWindow = require(appControllerPath.BASEVIEW);
	var movieDetailView = new createBaseView(' ',true,false);
	movieDetailView.headerView.hide();
	
	movieDetailView.left = 100*xratio;
	
	movieDetailView.btnBack = Ti.UI.createButton({
		left : 3*xratio,
		width : 8*xratio,
		height : 8*xratio,
		image : '/assets/images/back-arrow.png',
		borderRadius : 4*xratio,
		backgroundColor : '#80000000',
		zIndex : 13,
		top : 4*xratio
	});
	movieDetailView.add(movieDetailView.btnBack);
	
	movieDetailView.detailScrollView = Ti.UI.createScrollView({
		top : 0*yratio,
		bottom : 0*yratio,
		backgroundColor : '#ffffff',
		layout : 'vertical',
		zIndex : 1
	});
	movieDetailView.add(movieDetailView.detailScrollView);
	
	movieDetailView.moviePoster = Ti.UI.createImageView({
		height : 120*xratio,
		width : 100*xratio,
		image : _movieData.Poster
	});
	movieDetailView.detailScrollView.add(movieDetailView.moviePoster);
	
	movieDetailView.titleView = Ti.UI.createView({
		bottom : 0*xratio,
		height : 16*xratio,
		backgroundColor : '#ffad00',
		touchEnabled : false
	});
	movieDetailView.detailScrollView.add(movieDetailView.titleView);
	
	movieDetailView.lblTitle = Ti.UI.createLabel({
		color : '#ffffff',
		text : _movieData.Title,
		font : {fontSize : 4.25*xratio},
		lines : 2,
		ellipsize : true,
		textAlign : 'left',
		left : 5*xratio,
		right : 5*xratio,
		top : 1*xratio,
		touchEnabled : false
	});
	movieDetailView.titleView.add(movieDetailView.lblTitle);
	
	movieDetailView.lblYear = Ti.UI.createLabel({
		color : '#f5f5f5',
		text : 'Release Year : '+_movieData.Year,
		font : {fontSize : 3.25*xratio},
		ellipsize : true,
		textAlign : 'left',
		left : 5*xratio,
		right : 5*xratio,
		bottom : 1*xratio,
		touchEnabled : false
	});
	movieDetailView.titleView.add(movieDetailView.lblYear);
	
	movieDetailView.lblPlot = Ti.UI.createLabel({
		color : '#000000',
		text : _movieData.Plot,
		font : {fontSize : 4.25*xratio},
		ellipsize : true,
		textAlign : 'left',
		left : 5*xratio,
		right : 5*xratio,
		top : 4*xratio,
		touchEnabled : false
	});
	movieDetailView.detailScrollView.add(movieDetailView.lblPlot);
	
	movieDetailView.lblActors = Ti.UI.createLabel({
		color : '#000000',
		text : 'Actors : '+_movieData.Actors,
		font : {fontSize : 4.25*xratio},
		ellipsize : true,
		textAlign : 'left',
		left : 5*xratio,
		right : 5*xratio,
		top : 4*xratio,
		touchEnabled : false
	});
	movieDetailView.detailScrollView.add(movieDetailView.lblActors);
	
	movieDetailView.lblBlank = Ti.UI.createLabel({
		color : '#ffffff',
		text : 'Actors : ',
		font : {fontSize : 4.25*xratio},
		ellipsize : true,
		textAlign : 'left',
		left : 5*xratio,
		right : 5*xratio,
		top : 1*xratio,
		touchEnabled : false
	});
	movieDetailView.detailScrollView.add(movieDetailView.lblBlank);
	
	return movieDetailView;
};
module.exports = movieDetailWindow;