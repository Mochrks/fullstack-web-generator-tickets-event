/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { gql, useQuery } from "@apollo/client";
import "./../../App.css";
import Loading from "./Loading";

const GET_LATEST_EVENT = gql`
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

export function Ticket() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [load, setLoad] = useState(true);
  const { loading, error, data } = useQuery(GET_LATEST_EVENT);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleConvertToImage = () => {
    const node = document.getElementById("your-div-id");
    if (node) {
      html2canvas(node).then((canvas) => {
        const imageURL = canvas.toDataURL("image/png");
        setImageURL(imageURL);

        const downloadURL = imageURL;

        const downloadLink = document.createElement("a");
        downloadLink.href = downloadURL;
        downloadLink.download = "ticket.png";

        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);

        console.log("Download image successful");
      });
    }
  };
  if (loading) return <><Loading /></>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getLatestEvent) return <p>No data found</p>;

  const event = data.getLatestEvent;
  return (
    <>
      {load ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <LampContainer>
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-1 bg-gradient-to-br from-slate-100 to-slate-500 py-1 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
              Your Ticket
            </motion.h1>
            <motion.div
              id="your-div-id"
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="flex flex-row w-[600px] h-[200px] rounded-3xl  bg-blue-200 py-2 mt-10 bg-ticket"
            >
              <div className="flex flex-col flex-grow border-r-4 border-dashed border-gray-500 mr-5">
                <div className="flex flex-row  px-4 py-2">
                  <h1 className="text-xl font-bold">{event.numberOfTickets}</h1>
                  <div className="flex-grow"></div>
                  <h2 className="mr-3 font-bold">
                    {event.eventDate} | {event.eventTime}
                  </h2>
                </div>

                <h2 className="text-2xl px-4 pt-1 font-bold">
                  {event.eventName}
                </h2>
                <p className="px-4">{event.venueAddress}</p>
                <div className="flex-grow"></div>
                <div className="flex flex-row">
                  <h1 className="text-3xl px-4 font-bold p-2">
                    {event.ticketType}
                  </h1>
                  <div className="flex-grow"></div>
                  <h1 className="text-3xl px-4 font-bold p-2">
                    {event.slogan}
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-center mr-8">
                <QRCode
                  value={event.qrcode}
                  className="object-cover w-[100px] h-[100px] rounded-md"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.0, y: 0 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="pt-10"
            >
              <button
                className="bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 w-40 h-10 rounded-xl  border border-blue text-sm font-bold"
                onClick={handleConvertToImage}
              >
                Download Tickets
              </button>
            </motion.div>
          </LampContainer>
        </>
      )}
    </>
  );
}
