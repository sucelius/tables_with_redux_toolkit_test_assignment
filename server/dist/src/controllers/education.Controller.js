"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationUpdateController = exports.educationDeleteController = exports.educationCreateController = exports.educationGetController = void 0;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const educationGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.$connect();
        const educations = yield client.education.findMany();
        res.send(educations);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.educationGetController = educationGetController;
const educationCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    try {
        yield client.$connect();
        const newEducation = yield client.education.create({
            data: {
                name: name,
            },
        });
        console.log(newEducation);
        res.send(newEducation);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.educationCreateController = educationCreateController;
const educationDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body;
    try {
        yield client.$connect();
        const delEducation = yield client.education.delete({
            where: {
                id: Number(id),
            },
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.educationDeleteController = educationDeleteController;
const educationUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    try {
        // const client = new PrismaClient();
        yield client.$connect();
        const updateEducation = yield client.education.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            }
        });
        res.send(updateEducation);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.educationUpdateController = educationUpdateController;
