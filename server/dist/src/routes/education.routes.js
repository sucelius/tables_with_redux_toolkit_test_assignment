"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationRouter = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const education_Controller_1 = require("../controllers/education.Controller");
exports.educationRouter = (0, express_1.Router)();
exports.educationRouter.get('/data', education_Controller_1.educationGetController);
exports.educationRouter.post('/data', education_Controller_1.educationCreateController);
exports.educationRouter.delete('/data', (0, cors_1.default)(), education_Controller_1.educationDeleteController);
exports.educationRouter.put('/data', education_Controller_1.educationUpdateController);
