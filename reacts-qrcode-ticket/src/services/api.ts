import { gql } from "@apollo/client";

export const GET_EVENT_BY_QRCODE = gql`
  query GetEventByQrcode($qrcode: String!) {
    getEventByQrcode(qrcode: $qrcode) {
      qrcode
      firstName
      lastName
      email
      eventName
      eventDate
      eventTime
      venueAddress
      ticketType
      numberOfTickets
      slogan
    }
  }
`;


export const GET_LATEST_EVENT = gql`
  query GetLatestEvent {
    getLatestEvent {
      qrcode
      firstName
      lastName
      email
      eventName
      eventDate
      eventTime
      venueAddress
      ticketType
      numberOfTickets
      slogan
      createdAt
      updatedAt
    }
  }
`;