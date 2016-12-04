function homeController(){
    var homeView = null;
    
    // listeners on components
    function setEventListeners(){
       	homeView.addEventListener('viewDidAttach', viewDidAttachListener);
   		homeView.addEventListener('viewDidDeattach', viewDidDeattachListener);
       	homeView.btnBack.addEventListener('click', closeHomeView);
       	for(var i=0; i<homeView.movieTableView.children.length;i++){
       		homeView.movieTableView.children[i].addEventListener('click', movieTableViewClickListener);
       	}
    };
    
   	function closeHomeView(){
   		closeCurrentWindow();
   	}
   	
   	function movieTableViewClickListener(e){
   		Ti.API.info(JSON.stringify(e.source.data));
   		if(e.source.data){
   			var loader = new (require(appControllerPath.ACTIVITYINDICATOR));
	    	loader.showActivityIndicator('Please Wait...');
   			var omdbSearchData = new (require(appControllerPath.OMDbTASK));
	        omdbSearchData.getSingleMovieData(successCallbackGetData,errorCallbackGetData,loader,e.source.data.imdbID);
   		}
   	}
   	
   	function successCallbackGetData(_serviceName,_resultData,_loader){
   		var parseResult = JSON.parse(_resultData);
    	_loader.hideActivityIndicator();
		ViewManager.loadNextController(appControllerPath.MOVIEDETAILCONTROLLER,parseResult);
   	}
   	
   	function errorCallbackGetData(_serviceName,_resultData,_loader){
   		_loader.hideActivityIndicator();
   		alert(_resultData);
   	}
   	
    function viewDidDeattachListener(e){
   		homeView.removeAllChildren();
    	homeView.btnBack.removeEventListener('click', closeHomeView);
    	// homeView.movieTableView.removeEventListener('click', movieTableViewClickListener);
    	for(var i=0; i<homeView.movieTableView.children.length;i++){
       		homeView.movieTableView.children[i].removeEventListener('click', movieTableViewClickListener);
       	}
       	homeView.removeEventListener('viewDidAttach', viewDidAttachListener);
   		homeView.removeEventListener('viewDidDeattach', viewDidDeattachListener);
    	homeView = null;
   	}
    
    function viewDidAttachListener(e){
   		homeView.animate(slideDetailInAni);
   	}
        
    return{
        init : function(_movieListData){        	
			homeView = new (require(appControllerPath.MOVIELISTVIEW))(_movieListData);			
			setEventListeners();
			ViewManager.addView(homeView);
			viewsArray.push(homeView);
        }
    };
};

module.exports= homeController;
