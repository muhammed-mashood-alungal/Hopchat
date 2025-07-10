import { Response } from 'express';

export const successResponse = (
  res: Response,
  status: number,
  message: string,
  data?: Object,
) => {
  res.status(status).json({ success: true, message, ...data });
};
