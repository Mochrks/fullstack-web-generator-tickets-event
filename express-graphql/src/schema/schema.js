const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Event {
    qrcode: String
    firstName: String
    lastName: String
    email: String
    eventName: String
    eventDate: String
    eventTime: String
    venueAddress: String
    ticketType: String
    numberOfTickets: String
    slogan: String
    createdAt: String
    updatedAt: String
  }

  input EventInput {
    firstName: String
    lastName: String
    email: String
    eventName: String
    eventDate: String
    eventTime: String
    venueAddress: String
    ticketType: String
    slogan: String
  }

  type Query {
    getEventByQrcode(qrcode: String!): Event
    getLatestEvent: Event
  }

  type Mutation {
    addEvent(input: EventInput): Event
  }
`;

module.exports = typeDefs;
