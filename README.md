# Streaming Stack

Simple example of an ember/node stack that streams from database to client.

Why?  [http://oboejs.com/why](http://oboejs.com/why)

## Running it

### Clone it

### Install dependencies

```
npm install
```

### Prepare the database
Make sure you have [Neo4j](http://www.neo4j.org/) running locally on port 7474.

Populate the database with :Test nodes with a name property.
```
node populate_data 10000
```

### Run it.

```
grunt server
```
Visit [http://localhost:8000/](http://localhost:8000/)


## Notable features

 * oboe.js
 * oboe_worker.js
 * cancelAnimationFrame
 * ember list-view
 * cypher-stream
