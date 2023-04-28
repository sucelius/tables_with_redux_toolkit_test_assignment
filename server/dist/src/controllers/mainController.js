"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainRouter = (0, express_1.Router)();
const mainPage = (req, res) => {
    res.send('Hello!!!');
};
exports.default = mainRouter;
