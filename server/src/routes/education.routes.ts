import { Router, Request, Response } from 'express';
import cors from 'cors';

import {
  educationCreateController,
  educationDeleteController,
  educationUpdateController,
  educationGetController,
} from '../controllers/education.Controller';

export const educationRouter = Router();

educationRouter.get('/data', educationGetController);

educationRouter.post('/data', educationCreateController);

educationRouter.delete('/data', cors(), educationDeleteController);

educationRouter.put('/data', educationUpdateController);
