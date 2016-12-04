createBaseView = function(_titleText,_isBackRequired,_isRightRequired) {
	//Base View Creation	
	var baseView = Ti.UI.createView({
		width : 100*xratio,
		height : 100*yratio,
		backgroundColor : '#ffad00'		
	});	
	
	baseView.headerView = Ti.UI.createView({
		height : 15*xratio,//10.41*yratio,//'50dp',
		top : 0*yratio,
		backgroundColor : '#ffad00'		
	});
	baseView.add(baseView.headerView);
	if(_isBackRequired){
		baseView.btnBack = Ti.UI.createButton({
			// title : 'Back1',
			left : 3*xratio,
			width : 8*xratio,
			height : 8*xratio,//'50dp',//10.41*yratio
			image : '/assets/images/back-arrow.png'
		});
		baseView.headerView.add(baseView.btnBack);
	}
	
	if(_isRightRequired){
		baseView.btnLogout = Ti.UI.createButton({
			title : 'Close',
			// backgroundImage : '/images/close_button.png',
			right : 0*xratio,
			width : 25*xratio,
			height : 15*xratio,//'50dp',//10.41*yratio
		});
		baseView.headerView.add(baseView.btnLogout);
	}
	
	if(_titleText != 'IMAGE'){
		baseView.lblHeader = Ti.UI.createLabel({
			text : _titleText,
			color : '#ffffff',
			// bottom : '8dp',
			font : {fontSize : 4.625*xratio, fontWeight : 'bold', fontFamily : fontType},
			left : 16.625*xratio,
			right : 16.625*xratio,
			height : 5*xratio,//5.2*yratio,
			textAlign : 'center',
			ellipsize : true
		});
	}else{
		baseView.lblHeader = Ti.UI.createImageView({
			// image  : '/images/home_top_logo.png',
			backgroundColor : '#80ffff00',
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,			
		});
	}
	baseView.headerView.add(baseView.lblHeader);

	return baseView;

};