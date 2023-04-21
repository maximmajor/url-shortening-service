import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers';
import  shortLinkRoute  from './modules/routes/shortLinkRoute';

// create the Express app
const app = express();

// connect to the database
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

// use middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());

// use routes
app.use('/', shortLinkRoute);

// handle 404 errors
app.use(notFoundHandler);

// handle errors
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});