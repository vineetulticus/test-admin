import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $gender: String!) {
    createUser(name: $name, email: $email, gender: $gender) {
      success
      error
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    userDelete(id: $id) {
      success
      error
      message
    }
  }
`;

export const USER_RESTORE = gql`
  mutation userRestore($id: Int!) {
    userRestore(id: $id) {
      success
      error
      message
    }
  }
`;
