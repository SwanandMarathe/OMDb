var viewManager = function(){     
   	this.addView = function(_view){   		
   		AppWindow.allBaseView.add(_view);
   		_view.fireEvent('viewDidAttach');
   	};
   	this.removeView = function(_view){
   		_view.fireEvent('viewDidDeattach');
   		AppWindow.allBaseView.remove(_view);
   	};
   	this.loadNextController = function(_controllerPath,_data){
   		var controller = new (require(_controllerPath));
   		controller.init(_data);
   	};   	
};

module.exports = viewManager;
