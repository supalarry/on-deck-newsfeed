import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Fellowship {
    id: Int!
    name: String!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    fellowships(): [Fellowship]!
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
