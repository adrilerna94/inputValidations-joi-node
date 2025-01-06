import { type NextFunction, type Request, type Response } from 'express';
import Joi from 'joi';

export const validateHeroe = <ReqParams, ReqBody, ReqQuery>(schema: Joi.ObjectSchema, reqType: 'body' | 'params' | 'query') => {

  return (req: Request<ReqParams, never, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
    const reqToValidate: ReqParams | ReqBody | ReqQuery = req[reqType];
    if (!reqToValidate) {
      return next(new Error("Invalid request Type: Expected 'body', 'params', or 'query'. "));
    }
    /*
      *En Joi, de forma predeterminada, el proceso de validación se detiene en el primer error encontrado.
      *Si deseas que Joi recoja todos los errores, debes pasar la opción abortEarly: false.
    */
    const validation = schema.validate(reqToValidate, {abortEarly: false}); //schema.validate(objToValidate)
    if (validation.error) {
      const errorMsn = validation.error.details.map(err=> ({
          field : err.path.join('.'), // convertimos ['path'] a 'path
          message: err.message, // mensaje error
          type: err.type // tipo validación que falló
      }));
      return res.status(400).send({errors: errorMsn});
    }
    next();
  }

}

