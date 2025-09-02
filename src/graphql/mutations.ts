import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $name: String!
    $email: String!
    $company: String!
    $service: String!
    $message: String!
  ) {
    createMessage(
      name: $name
      email: $email
      company: $company
      service: $service
      message: $message
    ) {
      id
      name
      email
      company
      service
      message
      createdAt
    }
  }
`;
