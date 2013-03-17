                alert('ready');
                $("#btnLogin").click(function(){
                    // if (username.length > 0 && password.length > 0) {
                    //     // Build the auth account request object.
                    //     var requestObj = {
                    //         'account': {
                    //             'username':username,
                    //             'password':password,
                    //             'deviceId':app.getDeviceId(),
                    //             'apiToken':app.getApiToken()
                    //         }
                    //     };
                    //     alert(JSON.parse(requestObj));
                        //z.net.connect('login', {username:username, password:password, deviceId:z.net.getDeviceId(), apiToken:z.net.getApiToken()}
                        //app.sendRequest('account/authorize','POST',requestObj,onAuthSuccess);
                    //}                    
                });



                // var ref = window.open('http://foobar.zenplanner.local/zenplanner/portal/calendar.cfm', '_self', 'location=yes,enableViewportScale=yes');
                // ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
                // ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
                // ref.addEventListener('exit', function() { alert(event.type); });
            }

//                     var username = $.trim($('#txtUsername').val());
//                     var password = $.trim($('#txtPassword').val());
//                     var deviceId = '1234567890';
                    
//                     var dataString = 'username='+ username + '&password=' + password + '&deviceId=' + deviceId + '&apiToken=FC154DE7-7EE2-48CA-B428-DD29F564B1F8';
//                     dataEnc = encodeURIComponent(dataString);

//                     $.ajax({  
//                       type: "GET",  
//                       url: "https://api.zenplanner.com/zenplanner/api/3/remoteClient.cfc?method=login",  
//                       data: dataEnc,  
//                       success: function(data) {  
//                             alert('success');
//                             console.log(data); 
//                       },  
//                       error: function() {  
//                             alert('error');  
//                       }  
//                     });  
// //                    return false;