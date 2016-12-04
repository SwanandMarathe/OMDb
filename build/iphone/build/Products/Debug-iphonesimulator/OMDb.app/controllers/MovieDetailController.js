function movieDetailController(){
    var movieDetailView = null;
    
    // listeners on components
    function setEventListeners(){
       	movieDetailView.addEventListener('viewDidAttach', viewDidAttachListener);
   		movieDetailView.addEventListener('viewDidDeattach', viewDidDeattachListener);
       	movieDetailView.btnBack.addEventListener('click', closemovieDetailView);
    };
   	
   	function closemovieDetailView(){
   		closeCurrentWindow();
   	}
   	    
    function viewDidDeattachListener(e){
   		movieDetailView.removeAllChildren();    	    	
    	movieDetailView.btnBack.removeEventListener('click', closemovieDetailView);
       	movieDetailView.removeEventListener('viewDidAttach', viewDidAttachListener);
   		movieDetailView.removeEventListener('viewDidDeattach', viewDidDeattachListener);
    	movieDetailView = null;
   	}
    
    function viewDidAttachListener(e){
   		movieDetailView.animate(slideDetailInAni);
   	}
        
    return{
        init : function(_movieData){        	
			movieDetailView = new (require(appControllerPath.MOVIEDETAILVIEW))(_movieData);			
			setEventListeners();
			ViewManager.addView(movieDetailView);
			viewsArray.push(movieDetailView);
        }
    };
};

module.exports= movieDetailController;
