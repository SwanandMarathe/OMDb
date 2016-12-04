function firstController(){
    var firstView = null;
    
    // listeners on components
    function setEventListeners(){
       	firstView.addEventListener('viewDidAttach', viewDidAttachListener);
   		firstView.addEventListener('viewDidDeattach', viewDidDeattachListener);
       	firstView.searchButtonBase.addEventListener('click', searchButtonBaseListener);
    };
    
   	function searchButtonBaseListener(e){
   		var searchString = firstView.searchField.value.trim();
   		if(searchString != ''){
   			firstView.searchField.blur();
	   		var loader = new (require(appControllerPath.ACTIVITYINDICATOR));
	    	loader.showActivityIndicator('Please Wait...');
	    	var omdbSearchData = new (require(appControllerPath.OMDbTASK));
	        omdbSearchData.getData(successCallbackGetData,errorCallbackGetData,loader,searchString);
        }	
   	}
   	
   	function successCallbackGetData(_serviceName,_resultData,_loader){
   		var parseResult = JSON.parse(_resultData);
   		firstView.searchField.value = '';
    	_loader.hideActivityIndicator();
		ViewManager.loadNextController(appControllerPath.MOVIELISTCONTROLLER,parseResult);
   	}
   	
   	function errorCallbackGetData(_serviceName,_resultData,_loader){
   		_loader.hideActivityIndicator();
   		alert(_resultData);
   	}   
   	  
    function viewDidDeattachListener(e){
   		// alert('view remove First');
   		firstView.removeAllChildren();    	    	
    	firstView.searchButtonBase.removeEventListener('click', searchButtonBaseListener);
       	firstView.removeEventListener('viewDidAttach', viewDidAttachListener);
   		firstView.removeEventListener('viewDidDeattach', viewDidDeattachListener);
    	firstView = null;
   	}
    
    function viewDidAttachListener(e){
   		// alert('view add First');
   	}
        
    return{
        init : function(){        	
			firstView = new (require(appControllerPath.FIRSTVIEW));			
			setEventListeners();
			ViewManager.addView(firstView);
        }
    };
};

module.exports= firstController;
