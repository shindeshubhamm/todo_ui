import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      clientMutationId
      errors
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      clientMutationId
      errors
      success
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      clientMutationId
      errors
      todo {
        createdAt
        description
        id
        status
        title
        updatedAt
      }
    }
  }
`;
