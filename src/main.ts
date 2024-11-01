import { NestFactory } from '@nestjs/core';
const cors = require('cors');
import { AppModule } from './app.module';

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'ngrok-skip-browser-warning',
  ],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions));
  await app.listen(process.env.PORT || 3000);
}

// Ensure that the bootstrap function is invoked
export default bootstrap();
