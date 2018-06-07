const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { execute, subscribe, printSchema } = require('graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const url = require('url');
const { schema } = require('./src/api/schema');
const { mockSchema } = require('./src/mock/schema');

const environment = process.env.NODE_ENV;
const port = process.env.PORT || 3001;

const server = express();
const endpointURL = '/graphql';
const mockEndpointURL = '/mock/graphql';
const corsWhitelist = [
	/musicoin-frontend.netlify.com$/,
	/musicoin-schema.herokuapp.com$/,
	/musicoin.org$/,
	/localhost$/,
];

const corsOptions = {
	origin(origin = "", callback) {
		const location = url.parse(origin) || {};
		const hostname = location.hostname;

		if (!origin || corsWhitelist.some(regex => regex.test(hostname))) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

server.use(cors(corsOptions));

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

if (environment !== 'production') {
	console.log('\r\n----------------------------------------');
	console.log('Schema');
	console.log('----------------------------------------\r\n');
	console.log(printSchema(schema));
	console.log(`Go to http://localhost:${port}/graphiql to run queries!`);
}
