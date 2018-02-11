# Contributing

* [Schema updates](#schema-updates)
* [Mocking API](#mocking-api)

([Back to top ^](#contributing))

## Schema udpates

* Add new types to `./src/schema/types/<type-name>.graphql`
* Add type mutations, queries and interfaces to `./src/schema/types/<type-name>.graphql`
* Capitalise type, scalar and interface definitions e.g.

      	```graphql
      	scalar DateTime

      	interface Node {
      		id: ID!
      	}

      	type FooBar implements Node {
      		id: ID
      	}
      	```

* camelCase fields, mutations and queries e.g.

      	```graphql
      	type FooBar implements Node {
      		id: ID
      	 	dateOfBirth: DateTime!
      	}

      	type Query {
      	 	fooBar(id: ID!): FooBar!
      	}

      	type Mutation {
      	 	createFooBar(input: FooBarInput): FooBar!
      	}
      	```

* Add shared interfaces to `./src/schema/interfaces.graphql`
* Add custom scalars to `./src/schema/scalars.graphql` and [inform GraphQL of it's behaviour](#custom-scalars)
* Document types and their fields, queries and mutations using markdown alongside the relevant pieces
* Save files with `.graphql` extension to allow syntax highlighting on [GitHub](https://github.com/fathomlondon/bp-icp-schema/blob/master/src/schema/schema.graphql)

([Back to top ^](#contributing))

### Custom scalars

Before we can **mock** a custom Scalar type, GraphQL expects that we [define it's behaviour](http://dev.apollodata.com/tools/graphql-tools/scalars.html). However, since we are only mocking and do not care for implementation detail (that should be handled by the back-end) it is safe to create the following resolver for **any** custom Scalar you create:

```javascript
const gql = require('graphql');

module.exports = new gql.GraphQLScalarType({
	name: 'NameOfYourScalar',
	description: 'A description for your Scalar type',
	parseValue(value) {
		return value;
	},
	serialize(value) {
		return value;
	},
	parseLiteral(ast) {
		return ast.value;
	},
});
```

This should be created in `./src/resolvers/<name-of-scalar>.js` and then imported and exported within `./src/resolvers/index.js`. If for any reason you would like to manipulate or validate the data here as part of the mocked API, there is [an explanation](https://github.com/graphql/graphql-js/issues/500) of when the various methods are used [here](https://github.com/graphql/graphql-js/issues/500).

**N.B.** Always ensure a description is provided as this will be used in the GraphiQL documentation for the Scalar type.

([Back to top ^](#contributing))

## Mocking API

* Familiarise yourself with [GraphQL Mocking](http://dev.apollodata.com/tools/graphql-tools/mocking.html)
* Add mocks to `./src/mocks/<type-name>.js`
* Use [Faker](https://github.com/Marak/Faker.js) to generate fake data
* Import your mocked type into `./src/mocks/index.js`
* Declare your type with this mocked data as shown in [`./src/mocks/index.js`](../src/mocks/index.js)
* Restart `yarn serve` process to see changes, if applicable

([Back to top ^](#contributing))
