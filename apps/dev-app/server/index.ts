import { createYoga } from '@graphql-yoga/node';
import { createServer } from 'http';
import { schema } from './schema/schema.js';
import { initDatabase } from './db/database.js';

// Инициализация БД
initDatabase();

const yoga = createYoga({
  schema,
  graphiql: true, // GraphQL Playground для разработки
  cors: {
    origin: ['http://localhost:5173'], // Разрешить запросы с фронтенда
    credentials: true,
  },
});

const server = createServer(yoga);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 GraphQL Server running on http://localhost:${PORT}/graphql`);
  console.log(`📚 GraphQL Playground: http://localhost:${PORT}/graphql`);
});

