const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { execute, subscribe, printSchema } = require('graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { schema } = require('./src/api/schema');
const { mockSchema } = require('./src/mock/schema');

const environment = process.env.NODE_ENV;
const port = process.env.PORT || 3001;
const isDevelopment = environment === 'development';

const server = express();
const endpointURL = '/graphql';
const mockEndpointURL = '/mock/graphql';

server.use(cors());

// GraphQL endpoint
server.use(endpointURL, bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries and schema documentation
server.use('/graphiql', graphiqlExpress({ endpointURL }));

// GraphQL mock endpoint
server.use(
	mockEndpointURL,
	bodyParser.json(),
	graphqlExpress({ schema: mockSchema })
);

// GraphiQL mock, a visual editor for queries and schema documentation
server.use('/mock/graphiql', graphiqlExpress({ endpointURL: mockEndpointURL }));

server.listen(port);

if (isDevelopment) {
	console.log('\r\n----------------------------------------');
	console.log('Schema');
	console.log('----------------------------------------\r\n');
	console.log(printSchema(schema));
	console.log(`Go to http://localhost:${port}/graphiql to run queries!`);
}
