import { gql } from "apollo-server"

const PostSchema = gql`
  scalar Date
  # Model

  type Post {
    createdAt: String!
    content: String
    imageUrl: String
    author: User
    likes: [Like]
    comments: [Comment]
  }
`;

module.exports = PostSchema;