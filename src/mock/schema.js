const path = require('path');
const {
	makeExecutableSchema,
	addMockFunctionsToSchema,
} = require('graphql-tools');
const mergeSchemas = require('merge-graphql-schemas');
const mocks = require('.');

const schemaPath = path.join(__dirname, '../schema');
const typesArray = mergeSchemas.fileLoader(schemaPath, { recursive: true });
const typeDefs = mergeSchemas.mergeTypes(typesArray);

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

module.exports.mockSchema = schema;
