"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const user_Controller_1 = require("../controllers/user.Controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/data', user_Controller_1.userGetController);
exports.userRouter.post('/data', user_Controller_1.userCreateController);
exports.userRouter.delete('/data', (0, cors_1.default)(), user_Controller_1.userDeleteController);
exports.userRouter.put('/data', user_Controller_1.userUpdateController);
