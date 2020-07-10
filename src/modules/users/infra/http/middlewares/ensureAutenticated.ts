import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload{
  iat: number,
  exp: number,
  sub: string,
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authReader = request.headers.authorization;
  if (!authReader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authReader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
