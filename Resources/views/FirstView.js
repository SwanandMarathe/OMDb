function firstWindow() {
	var baseWindow = require(appControllerPath.BASEVIEW);
	var firstView = new createBaseView("OMDb",false,false);
	firstView.headerView.hide();
	
	firstView.omdbLogo = Ti.UI.createImageView({
		top : 10*yratio,
		height : 50*xratio,
		width : 50*xratio,
		image : '/assets/images/omdb-logo.png'
	});
	firstView.add(firstView.omdbLogo);
	
	firstView.searchField = Ti.UI.createTextField({
		top : 40*yratio,
		backgroundColor : '#33ffffff',
		width : 100*xratio,
		height : 15*xratio,
		color : '#ffffff',
		hintTextColor : '#a6ffffff',
		hintText : 'Search for your favorite movie...',
		font : { fontSize : 4*xratio},
		padding : 2*xratio,
		textAlign : 'center',
		// value : 'mission impossible'
	});
	firstView.add(firstView.searchField);
	
	firstView.searchButtonBase = Ti.UI.createView({
		top : 55*yratio,
		width : 70*xratio,
		height : 15*xratio,
		borderRadius : 7.5*xratio,
		borderColor : '#ffffff',
		borderWidth : .2*xratio
	});
	firstView.add(firstView.searchButtonBase);
	
	firstView.searchIcon = Ti.UI.createImageView({
		width : 7*xratio,
		height : 7*xratio,
		left : 4*xratio,
		image : '/assets/images/search-icon.png',
		touchEnabled : false
	});
	firstView.searchButtonBase.add(firstView.searchIcon);
	
	firstView.searchLabel = Ti.UI.createLabel({
		text : 'SEARCH',
		color : '#ffffff',
		font : { fontSize : 4.5*xratio},
		touchEnabled : false
	});
	firstView.searchButtonBase.add(firstView.searchLabel);
	
	firstView.largestDbLabel = Ti.UI.createLabel({
		text : 'THE LARGEST\nONLINE MOVIE DATABASE',
		color : '#ffffff',
		font : { fontSize : 5*xratio, fontWeight : 'bold'},
		touchEnabled : false,
		bottom : 10*yratio,
		textAlign : 'center'
	});
	firstView.add(firstView.largestDbLabel);
	
	return firstView;
};
module.exports = firstWindow;