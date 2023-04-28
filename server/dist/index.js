"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const main_routes_1 = require("./src/routes/main.routes");
const user_routes_1 = require("./src/routes/user.routes");
const education_routes_1 = require("./src/routes/education.routes");
// import models, { sequelize } from './db/models';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.text());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/', main_routes_1.mainRouter);
app.use('/users', user_routes_1.userRouter);
app.use('/educations', education_routes_1.educationRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
