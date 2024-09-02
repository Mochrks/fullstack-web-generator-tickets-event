"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../utils/cn";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Loading from "./Loading";

const ADD_EVENT = gql`
  mutation AddEvent($input: EventInput!) {
    addEvent(input: $input) {
      qrcode
      firstName
      lastName
      email
      eventName
      eventDate
      eventTime
      venueAddress
      ticketType
      slogan
    }
  }
`;

export function FormContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    venueAddress: "",
    ticketType: "",
    numberOfTickets: "",
    slogan: "",
  });
  const [addEvent, { loading, error }] = useMutation(ADD_EVENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addEvent({
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            eventName: formData.eventName,
            eventDate: formData.eventDate,
            eventTime: formData.eventTime,
            venueAddress: formData.venueAddress,
            ticketType: formData.ticketType,
            slogan: formData.slogan,
          },
        },
      });
      console.log("Mutation response:", response.data);
      navigate("/form/tickets");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (loading) return <><Loading /></>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-2xl bg-slate-100 dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Ticket Registration Form
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please !!! fill out the information below:
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 w-[24rem] ">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              name="firstName"
              placeholder="Enter your first name"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              name="lastName"
              placeholder="Enter your last name"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email address"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="EventName">Event Name</Label>
          <Input
            id="EventName"
            name="eventName"
            placeholder="Enter the event name"
            type="text"
            value={formData.eventName}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="EventDate">Event Date</Label>
          <Input
            id="EventDate"
            name="eventDate"
            placeholder="Enter the event date (e.g., 2024-05-26)"
            type="text"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="EventTime">Event Time</Label>
          <Input
            id="EventTime"
            name="eventTime"
            placeholder="Enter the event time (e.g., 18:00)"
            type="text"
            value={formData.eventTime}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Venue">Venue Address</Label>
          <Input
            id="Venue"
            name="venueAddress"
            placeholder="Enter the venue address"
            type="text"
            value={formData.venueAddress}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="TicketType">Ticket Type</Label>
          <Input
            id="TicketType"
            name="ticketType"
            placeholder="Enter the ticket type (e.g., General Admission, VIP)"
            type="text"
            value={formData.ticketType}
            onChange={handleChange}
          />
        </LabelInputContainer>
        {/* <LabelInputContainer className="mb-4">
          <Label htmlFor="NumberofTickets">Number of Tickets</Label>
          <Input
            id="NumberofTickets"
            name="numberOfTickets"
            placeholder="Enter the number of tickets"
            type="text"
            value={formData.numberOfTickets}
            onChange={handleChange}
          />
        </LabelInputContainer> */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Slogan">Slogan</Label>
          <Input
            id="Slogan"
            name="slogan"
            placeholder="Enter your slogan"
            type="text"
            value={formData.slogan}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Create Ticket &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
