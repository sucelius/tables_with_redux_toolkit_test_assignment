"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB = process.env.DATABASE;
const sequelize = new sequelize_1.Sequelize('postgres://sucelius:0994@localhost:5432/mydb'); // Example for postgres 
exports.sequelize = sequelize;
// const sequelize = new Sequelize('postgres', process.env.PORT, 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
// });
const models = {
    User: (0, user_1.UserFactory)(sequelize),
};
exports.default = models;
