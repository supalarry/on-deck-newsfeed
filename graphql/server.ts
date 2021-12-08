import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`

  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
  }

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

  type Newsfeed {
    founders: [User!]
    angels: [User!]
    writers: [User!]
    projects: [Project!]
    announcements(fellowship: String!): [Announcement!]
  }

  type Query {
    project(id: ID!): Project!
    user(id: ID!): User!
    fellowships: [Fellowship]!
    newsfeed: Newsfeed!
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
