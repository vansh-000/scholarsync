import Cors from 'cors';
import initMiddleware from './init-middleware';

const cors = initMiddleware(
  Cors({
    origin: ['http://localhost:3001'], // Use array for multiple origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

export default cors;
