import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";
import UserRoutes from "./project/users/routes.js";
import cors from "cors";
import PostRoutes from './project/posts/routes.js';
import LikesRoutes from './project/likes/routes.js';
import MovieRoutes from './project/movies/routes.js';
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/kanbas';
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
  
app.use(express.json());
UserRoutes(app);
PostRoutes(app);
LikesRoutes(app);
MovieRoutes(app);
app.listen(process.env.PORT || 4000);