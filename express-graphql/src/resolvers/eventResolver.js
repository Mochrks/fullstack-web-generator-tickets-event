const Event = require("../models/event");

const eventResolver = {
  Query: {
    getEventByQrcode: async (_, { qrcode }) => {
      return await Event.findOne({ qrcode });
    },
    getLatestEvent: async () => {
      return await Event.findOne().sort({ createdAt: -1 });
    },
  },
  Mutation: {
    addEvent: async (_, { input }) => {
     
      const { numberOfTickets, ...rest } = input;
    
      const newEvent = new Event(rest);

      function generateRandomString(length) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return result;
      }

     
      newEvent.numberOfTickets = generateRandomString(12);

      
      return await newEvent.save();
    },
  },
};

module.exports = eventResolver;
