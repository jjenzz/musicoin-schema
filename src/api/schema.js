const path = require('path');
const mergeSchemas = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');
const { artist, featuredArtists } = require('./artist');

const schemaPath = path.join(__dirname, '../schema');
const typesArray = mergeSchemas.fileLoader(schemaPath, { recursive: true });
const typeDefs = mergeSchemas.mergeTypes(typesArray);

module.exports.schema = makeExecutableSchema({
	typeDefs,
	resolvers: {
		Query: {
			artist,
			featuredArtists,
		},
	},
});
