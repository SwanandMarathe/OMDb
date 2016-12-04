appcontroller = function() {
	this.AppController = {
	    // DATABASEMANAGER : 'database/DatabaseManager',
	   	VIEWMANAGER : 'viewManager',
	   	
	   	NETWORKMANAGER : 'network/HttpClientManager',
		OMDbTASK : 'network/OMDbTask',
		
		BASEVIEW : 'views/BaseWindow',
		FIRSTVIEW : 'views/FirstView',
		MOVIELISTVIEW : 'views/MovieListView',
		MOVIEDETAILVIEW : 'views/MovieDetailView',
		
		FIRSTCONTROLLER : 'controllers/FirstController',
		MOVIELISTCONTROLLER : 'controllers/MovieListController',
		MOVIEDETAILCONTROLLER : 'controllers/MovieDetailController',
				
		// OMDbMODEL : 'model/OMDbModel',
		
		ACTIVITYINDICATOR : 'components/activityIndicator'
  	};
};

module.exports = appcontroller;

