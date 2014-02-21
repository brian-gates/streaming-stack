export default Ember.Route.extend({
  model: function() {
    var that = this;
    var buffer = [];
    var frame_request;
    function push() {
      if(!buffer) {
        return;
      }
      that.controllerFor('index').get('model').pushObjects(buffer);
      buffer = [];
    }
    function add(data) {
      buffer.push(data);
      if(!frame_request) {
        frame_request = requestAnimationFrame(function() {
          frame_request = null;
          push();
        });
      }
    }
    var worker = new Worker("/oboe_worker.js");
    worker.onmessage = function(event) {
      var message = JSON.parse(event.data);
      if(message.path == '!*.test') {
        add(message.data)
      }
    }
    worker.postMessage(JSON.stringify({
      url     : '/api/stream',
      method  : 'GET',
      paths   : ['!*.test']
    }));
    return [];
  }
});
