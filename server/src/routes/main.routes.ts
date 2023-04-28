import {Router} from 'express';
import {mainPageController} from '../controllers/mainPageController'

export const mainRouter = Router();

 mainRouter.get('/', mainPageController)
 


