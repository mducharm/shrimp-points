import { gql } from "@apollo/client";

export const EXCHANGE_RATES2 = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: {email: $email, password: $password}) {
      jwtToken
    }
  }
`;

export const REGISTER = gql`
  mutation Register($displayName: String!, $email: String!, $password: String!) {
  registerPerson(
    input: {displayName: $displayName, email: $email, password: $password}
  ) {
    person {
      id
    }
  }
}
`;
export const CREATE_GROUP = gql`
  mutation CreateGroup($groupName: String!) {
    createGroup(input: {group: {name: $groupName}}) {
      group {
        id
      }
    }
  }
`;

