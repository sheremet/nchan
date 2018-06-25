(function () {
  var source = new EventSource('http://192.168.46.10:9123/nchan/sub/common', {

  });
  source.onmessage = onMessage;
  
  function onMessage(message) {
    console.log({msg: JSON.parse(message.data)});
  }
}());