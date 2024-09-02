"use client";
import React, { useEffect, useRef, useState } from "react";
import { WavyBackground } from "../ui/wavy-background";
import { WobbleCard } from "../ui/wobble-card";
import { BrowserMultiFormatReader } from "@zxing/library";
import { gql, useLazyQuery } from "@apollo/client";
import QRCode from "react-qr-code";

const GET_EVENT_BY_QRCODE = gql`
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

export function CheckQr() {
  const [result, setResult] = useState("No result");
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const videoRef = useRef(null);

  const [getEventByQrcode, { loading, error, data }] = useLazyQuery(
    GET_EVENT_BY_QRCODE,
    {
      variables: { qrcode: result },
    }
  );

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        setDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      codeReader.reset();
    };
  }, []);

  useEffect(() => {
    if (selectedDeviceId) {
      const codeReader = new BrowserMultiFormatReader();
      codeReader
        .decodeOnceFromVideoDevice(selectedDeviceId, videoRef.current)
        .then((result) => {
          setResult(result.text);
          setScanSuccess(true);
          getEventByQrcode({ variables: { qrcode: result.text } });
          setTimeout(() => setScanSuccess(false), 2000); // Reset border after 2 seconds
        })
        .catch((err) => {
          console.error(err);
          setScanSuccess(false);
        });

      return () => {
        codeReader.reset();
      };
    }
  }, [selectedDeviceId, getEventByQrcode]);

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40 overflow-hidden">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center mt-[140px]">
        Check Your Tickets
      </p>
      <p className="text-base md:text-lg mt-4 mx-4 text-white font-normal inter-var text-start">
        Welcome to the ticket verification page! Enter your ticket barcode below to quickly verify its authenticity.  Simply scan or manually input your barcode to access all relevant information regarding your ticket, including event details, personal information, and other important updates.
      </p>

      <div className="flex flex-col gap-5 w-[400px] h-[400px] rounded-2xl pt-5 mx-auto mt-10 bg-blue-200">
        <p className="text-xl md:text-1xl lg:text-2xl font-bold inter-var text-center  mx-auto">
          Qr Scanner
        </p>
        <div className="flex flex-col items-center justify-center">
          <select
            className="mb-4 p-2 border border-gray-300 rounded"
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            value={selectedDeviceId}
          >
            {devices.map((device, idx) => (
              <option key={idx} value={device.deviceId}>
                {device.label || `Device ${idx + 1}`}
              </option>
            ))}
          </select>
          <video
            ref={videoRef}
            className={`w-4/5 rounded-xl ${scanSuccess ? "border-4 border-green-500" : ""
              }`}
          />

          <button className="bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 w-40 h-10 rounded-xl  border border-blue text-sm font-bold mx-auto mt-5">
            {result}
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.getEventByQrcode && (
        <div className="mt-10">
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-w-[900px] min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <h4 className="max-w-lg md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-4xl font-bold tracking-[-0.015em] text-white">
              Information details
            </h4>
            <div className="flex flex-row max-w-3xl ">
              <div className="flex flex-col">
                <p className="mt-4 max-w-[26rem] text-left  text-2xl text-neutral-200 font-bold ">
                  {data.getEventByQrcode.firstName}{" "}
                  {data.getEventByQrcode.lastName}
                </p>
                <p className="mt-1 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  {data.getEventByQrcode.email}
                </p>
                <p className="mt-1 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  {data.getEventByQrcode.eventName}
                </p>
                <p className="mt-1 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  {data.getEventByQrcode.eventDate} |{" "}
                  {data.getEventByQrcode.eventTime}
                </p>
                <p className="mt-1 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  {data.getEventByQrcode.venueAddress}
                </p>
                <p className="mt-1 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  {data.getEventByQrcode.numberOfTickets}
                </p>
                <p className="mt-1 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  {data.getEventByQrcode.ticketType}
                </p>
                <p className="mt-1 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  {data.getEventByQrcode.slogan}
                </p>
              </div>
            </div>
            <img
              src="/linear.webp"
              width={500}
              height={500}
              alt="linear demo image"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
      )}
    </WavyBackground>
  );
}
