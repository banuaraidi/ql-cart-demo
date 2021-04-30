import queryResolver from './query';
import mutationResolver from './mutation';

// The resolvers
const resolvers = {
  Query: queryResolver(),
  Mutation: mutationResolver(),
};

export { resolvers };
