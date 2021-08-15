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

export const SET_ACTIVE_GROUP = gql`
  mutation SetActiveGroup ($personId: Int!, $activeGroup: Int!){
    updatePersonById(input: {personPatch: {
      activeGroup: $activeGroup
    }, id: $personId}) {
      person {
        activeGroup
      }
    }
  }
`;


export const SEND_INVITE = gql`
  mutation CreateGroupInvite ($createdBy: Int!, $groupId: Int!, $toPersonId: Int!) {
    createGroupInvite(
      input: {groupInvite: {createdBy: $createdBy, groupId: $groupId, toPersonId: $toPersonId}}
    ) {
      groupInvite {
        id
      }
    }
  }
`;


export const CANCEL_INVITE = gql`
  mutation CancelInvite($toPersonId: Int!, $groupId: Int!) {
    cancelInvite(input: {idOfGroup: $groupId, idOfPerson: $toPersonId}) {
      boolean
    }
  }
`;

