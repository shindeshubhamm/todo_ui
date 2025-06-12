import { gql } from "@apollo/client";

export const GET_TODO = gql`
  query Todo($id: ID!) {
    todo(id: $id) {
      createdAt
      description
      id
      status
      title
      updatedAt
    }
  }
`;

export const GET_TODOS = gql`
  query Todos {
    todos {
      createdAt
      description
      id
      status
      title
      updatedAt
    }
  }
`;
