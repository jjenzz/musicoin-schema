const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const {
	makeExecutableSchema,
	addMockFunctionsToSchema,
} = require('graphql-tools');
const { execute, subscribe, printSchema } = require('graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mergeSchemas = require('merge-graphql-schemas');
const mocks = require('./src/mocks');

const schemaPath = path.join(__dirname, './src/schema');
const typesArray = mergeSchemas.fileLoader(schemaPath, { recursive: true });
const typeDefs = mergeSchemas.mergeTypes(typesArray);
const schema = makeExecutableSchema({ typeDefs });

const environment = process.env.NODE_ENV;
const port = process.env.PORT || 3001;

const server = express();
const endpointURL = '/graphql';

server.use(cors());

addMockFunctionsToSchema({ schema, mocks });

// GraphQL endpoint
server.use(endpointURL, bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries and schema documentation
server.use('/', graphiqlExpress({ endpointURL }));

server.listen(port);

if (environment === 'development') {
	console.log('\r\n----------------------------------------');
	console.log('Schema');
	console.log('----------------------------------------\r\n');
	console.log(printSchema(schema));
	console.log(`Running on http://localhost:${port}`);
}
