import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'apollo-server-express';
import { resolvers } from '../resolvers/resolver';

let collectiveSchema = {};
try {
  collectiveSchema = importSchema('src/schemas/queriesSchema.graphql');
} catch (error) {
  console.error('GraphQL schema error:', error);
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs: [collectiveSchema],
  resolvers,
  logger: console,
});

export { schema };
