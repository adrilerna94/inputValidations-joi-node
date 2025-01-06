import { type NextFunction, type Request, type Response } from 'express';
import Joi from 'joi';

export const validate = <ReqParams, ReqBody, ReqQuery>(schema: Joi.ObjectSchema, reqType: 'body' | 'params' | 'query') => {

  return (req: Request<ReqParams, never, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
    const reqToValidate: ReqParams | ReqBody | ReqQuery = req[reqType];
    if (!reqToValidate) {
      return next(new Error("Req Type not supported.\n Must be 'body' | 'params' | 'query'"));
    }
    const validation = schema.validate(reqToValidate);
    if (validation.error) {
      const errorMsn = validation.error.details.map(err=> ({
          field : err.path.join('.'), // convertimos ['path'] a 'path
          message: err.message, // mensaje error
          type: err.type // tipo validación que falló
      }));
      res.status(400).send({errors: errorMsn});
    }
    next();
  }
}

