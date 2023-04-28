import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mainRouter } from './src/routes/main.routes';
import { userRouter } from './src/routes/user.routes';
import { educationRouter } from './src/routes/education.routes';
// import models, { sequelize } from './db/models';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cors());

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/educations', educationRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
