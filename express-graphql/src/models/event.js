const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const eventSchema = new mongoose.Schema(
  {
    qrcode: { type: String, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    eventName: String,
    eventDate: String,
    eventTime: String,
    venueAddress: String,
    ticketType: String,
    numberOfTickets: {
      type: String,
      default: generateRandomString(12),
    },
    slogan: String,
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", async function (next) {
  if (this.isNew && !this.qrcode) {
    this.qrcode = uuidv4();
  }
  next();
});

module.exports = mongoose.model("Event", eventSchema);
