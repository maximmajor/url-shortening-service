import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers';


// create the Express app
const app = express();



// use middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());



// handle 404 errors
app.use(notFoundHandler);

// handle errors
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});