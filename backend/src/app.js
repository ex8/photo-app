require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { MongoClient } = require('mongodb');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function start() {
  const app = express();
  
  const client = await MongoClient.connect(
    process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
  const db = client.db();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const githubToken = req.headers.authorization;
      const user = await db.collection('users').findOne({ githubToken });
      return {
        db,
        user,
      };
    },
  });
  server.applyMiddleware({ app });

  app.get('/', (req, res) => res.end('Welcome to Photo-Share API'));
  app.listen(4000, () => console.log(`GraphQL running at http://localhost:4000${server.graphqlPath}`));
}

start();
