var cypher = require('cypher-stream')('http://localhost:7474');
var count = process.argv[2] || 10000;
cypher('FOREACH (x IN range(1, '+count+') | CREATE (n:Test { name: x }))').resume();