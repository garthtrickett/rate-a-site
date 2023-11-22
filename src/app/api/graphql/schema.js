import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }
  type Post {
    id: String!
    title: String!
  }
  type Query {
    getUser(id: String!): User
    getPosts: [Post!]!
  }
`
