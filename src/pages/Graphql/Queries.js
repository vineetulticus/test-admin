import { gql } from "@apollo/client";

export const GET_USER_LIST = gql`
  query userList {
    userList {
      id
      name
      email
      gender
    }
  }
`;

export const USER_DELETED_DETAIL = gql`
  query userDeletedDetail {
    userDeletedDetail {
      id
      name
      email
      gender
    }
  }
`;

export const USER_DETAIL = gql`
  mutation userDetail($id: Int!) {
    userRestore(id: $id) {
      success
      error
      message
    }
  }
`;
