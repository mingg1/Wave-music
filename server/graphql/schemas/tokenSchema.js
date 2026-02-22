import gql from "graphql-tag";

export default gql`
  extend type Query {
    sf_token: String!
  }
`;
