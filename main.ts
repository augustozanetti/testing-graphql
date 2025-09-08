import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// The GraphQL schema
const typeDefs = `#graphql
   type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    getUser(id: ID!): User
    listUsers(limit: Int): [User!]!
  }
`;


const users = [
  { id: "1", name: "Teste", email: "test@test.com", age: 19 },
  { id: "2", name: "Teste", email: "test@test.com", age: 19 },
  { id: "3", name: "Teste", email: "test@test.com", age: 19 },
  { id: "4", name: "Teste", email: "test@test.com", age: 19 },

]

const getUsersById = (id: string) => {
  return users.find(user => user.id === id)
}

const getLimitedUsers = (limit: number) => {
  return users.slice(0, limit)
}

const resolvers = {
  Query: {
    getUser: (_parent, args, context, _info) => {
      return getUsersById(args.id)
    },

    listUsers: (_parent, args, context, _info) => {
      const limit = args.limit || users.length
      return getLimitedUsers(args.limit)
    },
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
