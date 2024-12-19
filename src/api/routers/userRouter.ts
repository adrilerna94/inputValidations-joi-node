import { Router } from 'express';
import validate from '../middlewares/joiValidation';
import { userIdSchema, userCreateSchema } from '../models/Joi/userSchemas';
import { helloWorld, getUsers, createUser, getUsersPage, getUserById } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/helloworld', helloWorld);
userRouter.get('/', getUsers);
userRouter.post('/',
  validate(userCreateSchema, 'body'),
  createUser
);
// userRouter.put('/', createUser);
// userRouter.delete('/', createUser);
userRouter.get('/pagination', getUsersPage);
userRouter.get('/:id',
  validate(userIdSchema, 'params'),
  getUserById
);
// userRouter.get('/user/:id?', getUserById);

export default userRouter;
