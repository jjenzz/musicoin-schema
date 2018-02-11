# Getting Started

* [Requirements](#requirements)
* [Spin up mocked API](#spin-up-mocked-api)
* [Querying mocked API](#querying-mocked-api)

## Requirements

* [Node](https://nodejs.org/en/) version 6.4.0+
* [Yarn](https://yarnpkg.com/lang/en/)

([Back to top ^](#getting-started))

## Spin up mocked API

1. Run `yarn` to bootstrap the project
1. Run `yarn start` to run the mocked API server locally
1. Go to `http://localhost:3001` in your browser

You will be presented with the [GraphiQL](https://github.com/graphql/graphiql) interface where you can query the mocked API and browse the schema documentation. To query the API from within your project, see [Querying mocked API](#querying-mocked-api).

([Back to top ^](#getting-started))

## Querying mocked API

1. Familiarise yourself with [how to query a GraphQL server](http://graphql.org/learn/queries/)
1. `POST` your [queries](http://graphql.org/learn/queries/) to the `http://localhost:3001/graphql` endpoint for local development or `https://musicoin-schema.herokuapp.com/graphql` for deployed version of schema.

([Back to top ^](#getting-started))
