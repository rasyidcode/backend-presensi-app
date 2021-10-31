import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import awilix from 'awilix';

import AuthRepository from './modules/auth/repository/db/mysql/auth.repository.js';
import UserRepository from './modules/user/repository/db/mysql/user.repository.js';

import IndexUsecase from './modules/index/usecase/index.usecase.js';
import AuthUsecase from './modules/auth/usecase/auth.usecase.js';
import UserUsecase from './modules/user/usecase/user.usecase.js';

import UserMiddleware from './modules/user/delivery/http/middleware/user.middleware.js';

import IndexHandler from './modules/index/delivery/http/index.handler.js'
import AuthHandler from './modules/auth/delivery/http/auth.handler.js';
import UserHandler from './modules/user/delivery/http/user.handler.js';

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

const dbClient = mysql.createConnection(dbOptions);

const appContainer = awilix.createContainer({
	injectionMode: awilix.InjectionMode.PROXY
});

appContainer.register({
	dbClient: awilix.asValue(dbClient),

	authRepository: awilix.asClass(AuthRepository),
	userRepository: awilix.asClass(UserRepository),

	indexUsecase: awilix.asClass(IndexUsecase),
	authUsecase: awilix.asClass(AuthUsecase),
	userUsecase: awilix.asClass(UserUsecase),

	userMiddleware: awilix.asClass(UserMiddleware),

	indexHandler: awilix.asClass(IndexHandler),
	authHandler: awilix.asClass(AuthHandler),
	userHandler: awilix.asClass(UserHandler)
});

var app = express();

dbClient.connect((err) => {
	if (err) throw err;

	console.log('Connected to database server');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

appContainer.resolve('indexHandler').registerRoutes(app, express);
appContainer.resolve('authHandler').registerRoutes(app, express);
appContainer.resolve('userHandler').registerRoutes(app, express);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, 'public')));

export default app;
