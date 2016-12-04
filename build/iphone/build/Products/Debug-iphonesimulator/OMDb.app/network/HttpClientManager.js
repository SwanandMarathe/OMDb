

function HttpClientManager()
{
	var resultHandlerCallback=null;
	
	var errorHandlerCallback=null;
	var url = Constants.SERVER_URL; //+ App.Constants.SERVICE_PATH;
	
	this.createNewHttpRequest = function(_serviceName,_stringToAppendToUrl,_dataToSend,_requestHeaderData,_methodType)
	{
		var tempUrl=url;
		
		if(_stringToAppendToUrl!=null && _stringToAppendToUrl!=undefined)
		{
			tempUrl += _stringToAppendToUrl;
		}
		
		var xhrObject = Titanium.Network.createHTTPClient();
		
		// alert(tempUrl);
		
		xhrObject.onload=function(e)
		{
			// alert('Response Text:'+this.responseData);
			// alert(this.responseText);
			var response = null;
			//var xmlDocument=Ti.XML.parseString(this.responseText);
			if(this.status == 200) {
			    if(resultHandlerCallback!=null)
			    	if(Titanium.Platform.name != 'android'){
			    		response = this.responseData;
			    	}else{
			    		response = this.responseText;
			    	}
                    resultHandlerCallback(_serviceName,response);
			} else {
			    showAlert("There is error in connecting to server, Please try  later.");
			    if(errorHandlerCallback!=null)
                    errorHandlerCallback(_serviceName, "There is error in connecting to server, Please try  later.");
			}
		};
		
		xhrObject.onerror=function(e)
		{
			Ti.API.info('In Error== '+ JSON.stringify(e));
			Ti.API.info("Error Response Code :", e.code);
			if(errorHandlerCallback!=null)
                errorHandlerCallback(_serviceName,e);
		};
		
		xhrObject.timeout=30000;
		Ti.API.info("Request: "+tempUrl);
		xhrObject.open(_methodType,tempUrl);
		
		if(_requestHeaderData!= null && _requestHeaderData != undefined){
			
			for(var i=0;i<_requestHeaderData.length;i++){
				//xhr.setRequestHeader('Content-Type', "application/json",);
				xhrObject.setRequestHeader(_requestHeaderData[i].headerName,_requestHeaderData[i].value);
			}
		}
		
		if(_dataToSend!=null && _dataToSend != undefined)
		{
			xhrObject.send(_dataToSend);	
		}else
		{
			xhrObject.send();
		}
	};
	
	this.setResultHandlerCallback=function(_resultHandlerCallback)
	{
		resultHandlerCallback=_resultHandlerCallback;
	};
	
	this.setErrorHandlerCallback=function(_errorHandlerCallback)
    {
        errorHandlerCallback=_errorHandlerCallback;
    };
    
    function showAlert(message)
    {
        alert(message);
    }
	
}
module.exports=HttpClientManager;