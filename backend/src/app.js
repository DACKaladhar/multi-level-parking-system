import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({
  limit: process.env.MAX_JSON_SIZE,
}));

app.use(express.urlencoded({
  extended: true,
  limit: process.env.MAX_JSON_SIZE,
}));

export { app };
