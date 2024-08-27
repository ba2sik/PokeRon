import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

const validateRequest = <T extends z.ZodTypeAny>(schema: T, dataSource: keyof Request) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[dataSource]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((zodError) => {
          const message =
            zodError.path.length > 0
              ? `${zodError.path.join('.')} is ${zodError.message}`
              : `${zodError.message}`;

          return { message };
        });
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
};

export const validateRequestBody = <T extends z.ZodTypeAny>(schema: T) =>
  validateRequest(schema, 'body');

export const validateRequestParams = <T extends z.ZodTypeAny>(schema: T) =>
  validateRequest(schema, 'params');
