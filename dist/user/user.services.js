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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";
class UserServices {
    userCreateService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password } = data;
                const existingUser = yield prisma.user.findUnique({
                    where: { email },
                });
                if (existingUser) {
                    return { status: 409, response: { error: "User already exists" } };
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 12);
                const user = yield prisma.user.create({
                    data: {
                        email,
                        name,
                        password: hashedPassword,
                        role: "user",
                    },
                });
                const userObjToShow = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
                return { status: 201, response: userObjToShow };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userUpdateService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return { status: 400, response: "id is empty" };
            }
            // if (data.role) {
            //   return { status: 400, response: "you cannot change the user's role" };
            // }
            try {
                const userToUpdate = yield prisma.user.findFirst({
                    where: {
                        id,
                    },
                });
                if (!userToUpdate) {
                    return { status: 404, response: { error: "user not found" } };
                }
                const userUpdated = yield prisma.user.update({
                    where: { id },
                    data: Object.assign(Object.assign({}, data), { updated_at: new Date().toISOString() }),
                });
                const userObjToShow = {
                    id: userUpdated.id,
                    name: userUpdated.name,
                    email: userUpdated.email,
                    role: userUpdated.role,
                };
                return { status: 200, response: userObjToShow };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userDeleteService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return { status: 400, response: "id is empty" };
            }
            try {
                const userToDelete = yield prisma.user.findFirst({
                    where: {
                        id,
                    },
                });
                if (!userToDelete) {
                    return { status: 404, response: "user not found" };
                }
                yield prisma.user.delete({
                    where: { id },
                });
                return {
                    status: 204,
                    response: "user deleted successfully",
                };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userListAllService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany();
                const usersToShow = users.map((user) => {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                });
                return { status: 200, response: usersToShow };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userListByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return { status: 400, response: "id is empty" };
            }
            try {
                const user = yield prisma.user.findFirst({
                    where: {
                        id,
                    },
                });
                if (!user) {
                    return { status: 404, response: "user not found" };
                }
                const userObjToShow = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
                return { status: 200, response: userObjToShow };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userLoginService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            if (!email || !password) {
                return { status: 400, response: { error: "invalid credentials!" } };
            }
            try {
                const user = yield prisma.user.findUnique({
                    where: { email },
                });
                if (!user) {
                    return { status: 404, response: { error: "user not found" } };
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return { status: 401, response: { error: "invalid credentials!" } };
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, {
                    expiresIn: "24h",
                });
                const userObjToShow = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token,
                };
                return { status: 200, response: userObjToShow };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
}
exports.default = UserServices;
