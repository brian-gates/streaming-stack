importScripts('oboe-browser.js');
var oboe = window.oboe;

function sendData(data) {
  postMessage(JSON.stringify(data));
}

onmessage = function(event) {
  var message = JSON.parse(event.data);
  var req = oboe({
      url     : message.url,
      method  : 'GET',
      headers : { }
    })
    .fail(function fail(error) {
      console.error(JSON.stringify(error));
    })
  ;
  message.paths.forEach(function(path){
    req.node(path, function (data) {
      sendData({ path: path, data: data })
    })
  });
}