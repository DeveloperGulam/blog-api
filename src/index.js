require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema/schema.js');
const resolvers = require('./resolvers/blogResolvers.js');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 8100 },
  });

  console.log(`Server running at ${url}`);
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});