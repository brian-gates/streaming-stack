export default Ember.Route.extend({
  model: function() {
    return [];
  },
  loadData: function() {
    var self = this;
    self.controllerFor('index').get('model').clear();
    $.getJSON('/api/stream').then(function(data){
      self.controllerFor('index').get('model').pushObjects(data);
    });
  },
  streamData: function() {
    var self = this;
    var buffer = [];
    var frame_request;
    self.controllerFor('index').get('model').clear();
    function push() {
      if(!buffer) {
        return;
      }
      self.controllerFor('index').get('model').pushObjects(buffer);
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
      console.log(event.data);
      var message = JSON.parse(event.data);
      if(message.path == '!*') {
        add(message.data)
      }
    }
    worker.postMessage(JSON.stringify({
      url     : '/api/stream',
      method  : 'GET',
      paths   : ['!*']
    }));
  },
  actions: {
    streamData: function() {
      this.streamData();
    },
    loadData: function() {
      this.loadData();
    }
  }
});
