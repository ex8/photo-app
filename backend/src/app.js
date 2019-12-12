const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { MongoClient } = require('mongodb');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function start() {
  const app = express();
  
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017/photo-share', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
  const db = client.db();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      db,
    }
  });
  server.applyMiddleware({ app });

  app.get('/', (req, res) => res.end('Welcome to Photo-Share API'));
  app.listen(4000, () => console.log(`GraphQL running at http://localhost:4000${server.graphqlPath}`));
}

start();
