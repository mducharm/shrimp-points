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
