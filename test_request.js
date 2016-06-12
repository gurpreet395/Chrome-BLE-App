/*xhr = new XMLHttpRequest();
var url = "http://31230528.ngrok.io/bot";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.onreadystatechange = function () { 
    if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.status + ", " + json.text)
    }
}
var data = JSON.stringify({"question":"this is a question","beaconid":"beacon1"});
xhr.send(data);*/

function simulator_ajax(){
		var data = {"question":"Where is Tim Finin?","beaconid":"Beacon 1"};
		
		$.ajax({
			url: "http://31230528.ngrok.io/bot/",
			type: "POST",
			datatype: 'json',
			data: JSON.stringify(data),
			contentType: "application/json",
			
			success: function(response){
				console.log("success" +response);
			},
			
			error: function(error_msg){
				console.log(error_msg);
			},
		});
	};
	simulator_ajax();