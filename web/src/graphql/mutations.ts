import { gql } from "@apollo/client";

export const EXCHANGE_RATES2 = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;