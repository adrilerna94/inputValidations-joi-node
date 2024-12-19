import Joi from 'joi';

const userCreateSchema = Joi.object({
  name: Joi.string().required().pattern(/^[a-zA-Z]+$/).min(3).max(20),
  job: Joi.string().required().alphanum().min(5).max(50),
  birthday: Joi.date().iso().min('1-1-2000'),
  username: Joi.string().alphanum().min(3).max(20),
  mail: Joi.string().email().min(5).max(30),
  password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
  repeatPassword: Joi.ref('password'),
}).or('username', 'mail').with('password', 'repeatPassword');

const userIdSchema = Joi.object({
  id: Joi.string().required().length(24).hex(),
});

export { userCreateSchema, userIdSchema };
