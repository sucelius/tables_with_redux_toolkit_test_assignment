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
exports.userUpdateController = exports.userDeleteController = exports.userCreateController = exports.userGetController = void 0;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const userGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.$connect();
        const users = yield client.user.findMany();
        res.send(users);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.userGetController = userGetController;
const userCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, educationName } = req.body;
    if (!name || !educationName) {
        res.status(400).send('Missing required data');
        return;
    }
    try {
        yield client.$connect();
        const newUser = yield client.user.create({
            data: {
                name: name,
                educationName: educationName,
            },
        });
        res.send(newUser);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    finally {
        yield client.$disconnect();
    }
});
exports.userCreateController = userCreateController;
const userDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.body);
    try {
        yield client.$connect();
        const delUser = yield client.user.delete({
            where: {
                id: userId,
            },
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.userDeleteController = userDeleteController;
const userUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, educationName } = req.body;
    try {
        yield client.$connect();
        const updateUser = yield client.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name,
                educationName: educationName,
            },
        });
        res.send(updateUser);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.userUpdateController = userUpdateController;
