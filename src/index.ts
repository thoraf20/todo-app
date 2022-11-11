import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import httpStatus from 'http-status-codes'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from './lib/logger'
import { requestLogger } from './middleware/requestLogger'
import mongoose from 'mongoose'
import auth from './middleware/auth'
import v1Router from './url'

dotenv.config()

const app = express();
const PORT = process.env.PORT || "3000";

const unless = (path: string[], middleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (path.includes(req.path)) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options("*", cors());
app.use(cookieParser())
app.use(requestLogger)

// app.use(unless(['/v1/register', '/v1/login'], auth))

app.use('/v1', v1Router)


app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).send()
})

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

mongoose.connect(process.env.MONGOURL as string)
mongoose.connection.on('error', (error) => {
  logger.error('Database connection error: ', error)
})

app.listen(PORT, () => logger.info(`Server is running on port: ${PORT}`));

export default app;