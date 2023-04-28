"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const mainPageController_1 = require("../controllers/mainPageController");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter.get('/', mainPageController_1.mainPageController);
