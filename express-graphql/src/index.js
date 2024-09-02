const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/eventResolver");

const startServer = async () => {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `Server is running on http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

startServer();
