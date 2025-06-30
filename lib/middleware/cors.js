import Cors from 'cors';
import initMiddleware from './init-middleware';

const cors = initMiddleware(
  Cors({
    origin: ['https://scholarsync-vansh.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

export default cors;
