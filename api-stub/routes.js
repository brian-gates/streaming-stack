var cypher     = require('cypher-stream')('http://localhost:7474');
var JSONStream = require('JSONStream');

module.exports = function(server) {
  // Create an API namespace, so that the root does not
  // have to be repeated for each end point.
	server.namespace('/api', function() {
		server.get('/stream', function(req, res) {
			cypher('match (test:Lens) return test')
				.pipe(JSONStream.stringify())
				.pipe(res);
		});
	});

};