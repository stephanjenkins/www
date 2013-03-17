(function()
{
	z.net.login = function(username, password, onload)
	{
		z.net.connect('login', {username:username, password:password, deviceId:z.net.getDeviceId(), apiToken:z.net.getApiToken()}, onload);
	};	

	z.net.connect = function(data, onload, onerror)
	{
		// var serverRoot = "http://phoenix.local/zenplanner/api/3/remoteClient.cfc";        // DEVELOPMENT - BEN
		// var serverRoot = "https://x.zenplanner.com/zenplanner/api/3/remoteClient.cfc";    // STAGING
		var serverRoot    = "https://api.zenplanner.com/zenplanner/api/3/remoteClient.cfc";  // PRODUCTION
		
		var url = serverRoot + '?returnformat=json';

		// Add certificate to connection string
		data.apiToken = z.net.getApiToken();
		data.deviceId = z.net.getDeviceId();
		data.remoteClientId = z.net.getRemoteClientId();
		
		for (var field in data)
		{
			url += '&' + field + '=' + Ti.Network.encodeURIComponent(data[field]);
		}

		var client = Ti.Network.createHTTPClient
		({
			onload: function(e)
			{
				// Ti.API.log(url);
				// Ti.API.log(this.responseText);

				var result = JSON.parse(this.responseText);

				if (result.SUCCESS == 1)
				{
					onload(result.RESULT);
				}
				else
				{
					switch (result.MESSAGE)
					{
						case 'PROMPT':
							z.net.showPromptDialog(result.DETAIL);
							break;
							
						case 'LOGOUT':
							z.net.showPromptDialog(result.DETAIL);
							z.ui.doLogout();
							break;
							
						default:
							z.net.showErrorDialog(result.DETAIL, data, onload, onerror);
							break;
					}
				}
			},
			onerror: function(e)
			{
				// Ti.API.log(url);
				// Ti.API.log(e);

				z.net.showErrorDialog('There was an error connecting to the server.', data, onload, onerror);				
			},
			timeout: 5000 // miliseconds
		});

		client.open('GET', url);
		client.send();
		
		return client;
	};
	
	z.net.showPromptDialog = function(message)
	{
		var dialog = Ti.UI.createAlertDialog
		({
			message: message,
			title: 'Connection Error'
		});
		
		dialog.show();
	};
	
	z.net.showErrorDialog = function(message, data, onload, onerror)
	{
		var dialog = Ti.UI.createAlertDialog
		({
			cancel: 1,
			buttonNames: ['Retry', 'Cancel'],
			message: message,
			title: 'Connection Error'
		});
		  
		dialog.addEventListener('click', function(event)
		{
			if (event.index == 0) // RETRY
			{
				z.net.connect(data, onload, onerror);
			}  	
			else
			{
				if (onerror != null)
				{
					onerror(data, onload);
				}
			}
		  	// Ti.API.log(event);
		  });
		  
		  dialog.show();
	};

	// CONNECTION CREDENTIALS
	z.net.getApiToken = function()
	{
		return "FC154DE7-7EE2-48CA-B428-DD29F564B1F8";
	};

	z.net.getDeviceId = function()
	{
		var deviceId = Ti.App.Properties.getString('deviceId');

		if (deviceId == null)
		{
			deviceId = z.cf.CreateGuid();
			Ti.App.Properties.setString('deviceId', deviceId);
		}

		return deviceId;				
	};
	
	z.net.getRemoteClientId = function()
	{
		var remoteClientId = Ti.App.Properties.getString('remoteClientId');
		
		if (remoteClientId == null)
		{
			return "";
			}
		
		return remoteClientId;
	};

}());
