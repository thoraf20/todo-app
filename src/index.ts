import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import httpStatus from 'http-status-codes'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from './lib/logger'
import { requestLogger } from './middleware/requestLogger'
import mongoose from 'mongoose'
import v1Router from '../url'

dotenv.config()

const app = express();
const PORT = process.env.PORT || "3000";

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options("*", cors());
app.use(cookieParser())
app.use(requestLogger)

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