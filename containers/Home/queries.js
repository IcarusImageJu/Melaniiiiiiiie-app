import gql from "graphql-tag";

export const getCurrencyName = {
    query: gql`
        {
        rates(currency: "CAD") {
          name
        }
      }
    `
}