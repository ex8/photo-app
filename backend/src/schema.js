const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
    totalUsers: Int!
    allUsers: [User!]!
    me: User
  }
  
  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
    githubAuth(code: String!): AuthPayload!
  }

  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }

  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
    taggedUsers: [User!]!
    created: DateTime!
  }

  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]! 
    inPhotos: [Photo!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input PostPhotoInput {
    name: String!
    description: String
    category: PhotoCategory=PORTRAIT
  }
`;

module.exports = typeDefs;
