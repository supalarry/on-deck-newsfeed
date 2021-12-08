import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`

  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
    created_ts: String!
  }

  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
    created_ts: String!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
    created_ts: String!
  }

  type Fellowship {
    id: Int!
    name: String!
  }

  type Newsfeed {
    users(fellowship: String!, offset: Int!): [User!]
    projects(offset: Int!): [Project!]
    announcements(fellowship: String!, offset: Int!): [Announcement!]
  }

  type Query {
    project(id: ID!): Project!
    user(id: ID!): User!
    fellowships: [Fellowship]!
    newsfeed: Newsfeed!
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
