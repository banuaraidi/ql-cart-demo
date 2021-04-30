/* eslint-disable import/first */
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { schema } from './schemas/schema';

const PORT = 4000;
const server = express();

server.all(/\/api\/(?!graphql).+/, (req, res) => res.sendStatus(200));

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res })
});

const path = '/api';
apolloServer.applyMiddleware({
  app: server,
  path,
  cors: false
});

server.all(/\/.*/, (req, res) => res.sendStatus(200));

server.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://localhost:${PORT + apolloServer.graphqlPath}`)
);
