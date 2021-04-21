import 'reflect-metadata';
import '@shared/container';
import express, {
  Request, Response, NextFunction, json,
} from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server stater on port 3333!');
});
