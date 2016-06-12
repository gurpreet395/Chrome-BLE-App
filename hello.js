var element=document.getElementById("button");
element.onlick=foundDevices;
//console.log("e1 value is "+e1);

chrome.bluetooth.getAdapterState(function(adapter) {
  console.log("Adapter " + adapter.address + ": " + adapter.name);
});

//-----------------------Start Device Discovery-----------------------
//---------------------------------------------------------------------

chrome.bluetooth.startDiscovery(function() {
    
  // Stop discovery after 30 seconds.
  setTimeout(function() {
    chrome.bluetooth.stopDiscovery(function() {});
  }, 30000);
});
//function ends here
//-------------------------------------------------------------------------------
var device_names = {};
var device_ids=[];
var updateDeviceName = function(device) {
  device_names[device.address] = device.name;
   
    if(device_names.hasOwnProperty(device.address))
    {
        for(var i=0; i<device_ids.length;i++)
        {
            if(device_ids[i]==device.address)
            {
                return;
            }
                
        }    
      device_ids.push(device.address);
   // console.log(device_names[device.address]);
    }
  //  console.log(device_ids);
};

// --------------make jquery request--------------------
var jqueryRequest=function()
{
$.ajax('https://botengine-1323.appspot.com/bot', {
    method: 'PUT',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
        question:"this is a question",
        beaconid: "beacon1"
    })
})
.then(
    function success(userInfo) {
        // userInfo will be a JavaScript object containing properties such as
        // name, age, address, etc
    }
);


}

//--------------------Make Post Request------------------------------
/*var makePostRequest=function()
{
 var url="https://botengine-1323.appspot.com/bot";
    var postData="question=this is a question & beaconid=beacon1";
    method="POST";
    var async=true;
   var request=new XMLHttpRequest();
    
   
   request.onload = function()
    {
        var status=request.status;
        var data=request.responseText;
    }
    var data=request.responseText;
    request.open(method,url,async);
   request.setRequestHeader("content-type","application/x-www-form-urlencoded");
    request.send(postData);

}*/
//----------------------------------------------------------------------------------
var foundDevices=function(){
   //updateDeviceName;
   var id=device_ids[0];
 //  console.log("this is one e;lenent"+ device_ids[0]);
   return id;
}


//----------------------------------------------------------------------------------
//----------------Return my location----------------------------------------------

var returnMyLocation=function(){
    var locationid=foundDevices();
  //  console.log("id is"+ locationid);
    if(locationid=='E4:95:12:5A:17:79')
    {
      console.log("ITE343");
    }
    
    if(locationid=='D6:30:06:B0:2E:DB')
    {
       console.log("ITE212") ;
      
    }
     if(locationid=='E4:C1:E8:1E:DB:85')
    {
       console.log("ITE346") ;
      
    }
}
//-----------------------------------------------------------------------------

var removeDeviceName = function(device) {
  delete device_names[device.address];
 //   console.log(device_names)
}

//console.log("hello"+ device.address in device_names);

//---------------------------------------------

//----------------------------------------------------
var listDevices=function(addr){
 
    console.log(device_names.addr);
}
//------------------------------------------------------------------------------

var getConnected=function(device){
    chrome.bluetoothLowEnergy.connect(device.address, function () {
    if (chrome.runtime.lastError) {
      console.log('Failed to connect: ' + chrome.runtime.lastError.message);
      return;
    }
    console.log("success fully logged"+ device.address);
           
        
    // Connected! Do stuff...
    
  });
}
//------------------------------------------------------------------


var listServices=function(device){
        chrome.bluetoothLowEnergy.getServices(device.address, function(services) {
 
  for (var i = 0; i < services.length; i++) {
    console.log("service is "+ services[i].uuid + "name is "+ services[i].type);
    listCharacterstics(services[i]);
  }
  
});
}

//---------------------------------------------------------------------

var listCharacterstics=function(serviceList){
   // console.log("charactestic function");
    chrome.bluetoothLowEnergy.getCharacteristics(serviceList.instanceId,
                                                function(chracteristics) {
     //     if(chracteristics)
          console.log("CharacterStic of service  "+serviceList.uuid)
         for (var j = 0; j <chracteristics.length; j++) {
             // console.log("CharacterStic   "+chracteristics[j].uuid);
             getCharValue(chracteristics[j]);
         }
      
     });
   
    
} //function ends here
    
//--------------------------------------------------------------------------

var getCharValue=function(chrc){
    
chrome.bluetoothLowEnergy.readCharacteristicValue(chrc.instanceId,
                                                  function(result) {
                                                       
  if (chrome.runtime.lastError) {
      console.log('get char');
    console.log('Failed to read value: ' + chrome.runtime.lastError.message);
    return;
  }
 
  var bytes = new Uint8Array(result.value);

 console.log("got value"+ bytes);
 
  });
}                                                      
//---------------------------------------------------------------------        

//----------------Remove Devices-------------------------------------

    
// Add listeners to receive newly found devices and updates
// to the previously known devices.
chrome.bluetooth.onDeviceAdded.addListener(updateDeviceName);
chrome.bluetooth.onDeviceChanged.addListener(updateDeviceName);
chrome.bluetooth.onDeviceRemoved.addListener(removeDeviceName);

// With the listeners in place, get the list of devices found in
// previous discovery sessions, or any currently active ones,
// along with paired devices.

//-------------Function get all known devices to adapter-------------
//---------------------------------------------------------------------
chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
   //   listDevices(devices.address);
  //  updateDeviceName(devices[i]);
     // for(var j=0; j<device_names.length;j++)
     // {
      //    if(findIndex(device_names,devices.name) >-1)
        //  {
   //    console.log("devices bject"+device_names);
   //    console.log(devices[i].address +'name is='+ device_names[devices[i].address]);
          // }
     // }
   //  getConnected(devices[i]);
   // listServices(devices[i]);
  }
}); //function ends here




