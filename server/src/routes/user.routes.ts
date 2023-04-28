import { Router, } from 'express';
import cors from 'cors';
import {
  userCreateController,
  userDeleteController,
  userUpdateController,
  userGetController,
} from '../controllers/user.Controller';

export const userRouter = Router();

userRouter.get('/data', userGetController);

userRouter.post('/data', userCreateController);

userRouter.delete('/data',cors(), userDeleteController);

userRouter.put('/data', userUpdateController);
