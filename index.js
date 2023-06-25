import express from "express";
import cors from "cors";
import winston from "winston";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import UserRouter from "./routes/user.route.js"

const { combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "fitmanager-api.log"})
    ],
    format: combine(
        label( {label: "fitmanager-api"}),
        timestamp(),
        myFormat
    )
})

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: "flamengo",
  resave: false,
  saveUninitialized: false
}));

app.use("/user", UserRouter);

app.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({error: err.message});
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
