import { type Request, type Response, type NextFunction } from 'express';
import httpStatus from '../config/httpStatusCodes';

const helloWorld = (req: Request, res: Response) => {
  res.send('Hello World!');
}

const users = [
  {name: 'John', email: 'john@gmail.com'},
  {name: 'Mike', email: 'mike@gmail.com'},
  {name: 'Kate', email: 'kate@gmail.com'},
];

const getUsers = (req: Request, res: Response) => {
  // TODO: Get users from DB
  res.send(users);
}

const createUser = (req: Request, res: Response) => {

  console.log(req.body);
  // TODO: Save user to DB
  users.push({name: req.body.name, email: req.body.email})
  const response = {
    msg: 'User created successfully',
  };
  res.send(response);
}

const getUsersPage = (req: Request, res: Response) => {
  console.log(req.query.param1)
  console.log(req.query.abc)
  // TODO: Get users from DB
  res.send(users);
}

const getUserById = (req: Request, res: Response) => {
  console.log(req.params);
  // TODO: Get user from DB
  const user = users.find((user: {name: String, email: String}) => user.name === req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(httpStatus.notFound).send({error: 'User not found'});
  }
}

export { helloWorld, getUsers, createUser, getUsersPage, getUserById };
