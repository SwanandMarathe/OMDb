function OMDbTask() {

	var successCallback = null;
	var errorCallback = null;
	var loader = null;
	var httpClientManager = require('network/HttpClientManager');
	var httpClientManagerInstance = new httpClientManager();

	httpClientManagerInstance.setResultHandlerCallback(serviceResultHandler);
	httpClientManagerInstance.setErrorHandlerCallback(serviceErrorHandler);
	
	function serviceResultHandler(_serviceName,_resultData) {
		// Ti.API.info('OMDbTask succ'+_resultData+":"+_serviceName);
		successCallback(_serviceName,_resultData,loader);
	};

	function serviceErrorHandler(_serviceName,_errorObject) {
		errorCallback(_serviceName,_errorObject,loader);
	};

	this.getData = function(_successCallback, _errorCallback, _loader, _searchString) {
		successCallback = _successCallback;
		errorCallback = _errorCallback;
		loader = _loader;
		var requestHeader = [{
			headerName : "Content-Type",
			value : "application/json"
		}];
		var loginString = '?s='+_searchString+'&y=&plot=short&r=json';
		httpClientManagerInstance.createNewHttpRequest(Constants.SERVER_URL,loginString, null, requestHeader, Constants.METHOD_GET);
	};
	
	this.getSingleMovieData = function(_successCallback, _errorCallback, _loader, _imdbId) {
		successCallback = _successCallback;
		errorCallback = _errorCallback;
		loader = _loader;
		var requestHeader = [{
			headerName : "Content-Type",
			value : "application/json"
		}];
		var loginString = '?i='+_imdbId+'&plot=full&r=json';
		httpClientManagerInstance.createNewHttpRequest(Constants.SERVER_URL,loginString, null, requestHeader, Constants.METHOD_GET);
	};

}
module.exports = OMDbTask;
