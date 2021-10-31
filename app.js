import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

import AuthMysqlRepository from './modules/auth/repository/mysql/auth.js';
import UserMysqlRepository from './modules/user/repository/mysql/user.js';

import IndexUsecase from './modules/index/usecase/index.js';
import AuthUsecase from './modules/auth/usecase/auth.js';
import UserUsecase from './modules/user/usecase/user.js';

import UserMiddleware from './modules/user/delivery/http/middleware/middleware.js';

import IndexHandler from './modules/index/delivery/http/index.js'
import AuthHandler from './modules/auth/delivery/http/auth.js';
import UserHandler from './modules/user/delivery/http/user.js';


dotenv.config();

const corsOptions = {
	origin: '*'
};

const dbOptions = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
}

var app = express();

const dbClient = mysql.createConnection(dbOptions);
// console.log(dbClient);
dbClient.connect((err) => {
	if (err) throw err;

	console.log('Connected to database server');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, 'public')));

const authRepository = new AuthMysqlRepository(dbClient);
const userRepository = new UserMysqlRepository(dbClient);

const indexUsecase = new IndexUsecase();
const authUsecase = new AuthUsecase(authRepository);
const userUsecase = new UserUsecase(userRepository);

const indexHandler = new IndexHandler(indexUsecase);
const authHandler = new AuthHandler(authUsecase);
const userHandler = new UserHandler(userUsecase);

const userMiddleware = new UserMiddleware(userUsecase);

indexHandler.registerRoutes(app, express);
authHandler.registerRoutes(app, express);
userHandler.registerRoutes(app, express, userMiddleware);

export default app;