import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $name: String!
    $email: String!
    $social: String!
    $company: String!
    $service: String!
    $message: String!
  ) {
    createMessage(
      name: $name
      email: $email
      social: $social
      company: $company
      service: $service
      message: $message
    ) {
      id
      name
      social
      email
      company
      service
      message
      createdAt
    }
  }
`;
