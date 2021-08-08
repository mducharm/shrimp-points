import { DocumentNode, gql } from "@apollo/client";

export const EXCHANGE_RATES: DocumentNode = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export const ALL_PEOPLE = gql`
query people {
    allPeople {
      nodes {
        displayName
      }
    }
  }
`;


export const GET_GROUPS = gql`
  query GetGroups {
    currentPerson {
      displayName
      id
      activeGroup
      personGroupsByPersonId {
        nodes {
          groupByGroupId {
            id
            name
            createdBy
            personGroupsByGroupId {
              nodes {
                personByPersonId {
                  displayName
                  id
                }
              }
            }
            groupInvitesByGroupId {
              nodes {
                personByToPersonId {
                  displayName
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_PEOPLE = gql`
  query SearchPeople($search: String!) {
    searchPeople(search: $search, first: 10) {
      nodes {
        displayName
        id
      }
    }
  }
`;