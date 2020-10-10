import { gql } from 'apollo-server'
import PostSchema from './Post'

const schema = gql`
  type Query {
    dummy: String
  }

  type Mutation {
    dummy: String
  }

  ${PostSchema}
`;

module.exports = schema;