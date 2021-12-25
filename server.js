import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import logger from './config/winston.js';
import swaggerFile from "./swagger_output.json"


connectDB();


const app = express();
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan('combined', { stream: logger.stream }));
}

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(notFound);
// error handler
app.use(errorHandler);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;


app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);