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
const user_services_1 = __importDefault(require("./user.services"));
const user_services = new user_services_1.default();
class UserControllers {
    userCreateController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const user = yield user_services.userCreateService(body);
                res.status(user.status).send(user.response);
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userUpdateController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const id = req.params.id;
                const user = yield user_services.userUpdateService(id, body);
                res.status(user.status).send(user.response);
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userDeleteController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_services.userDeleteService(id);
                res.status(user.status).send(user.response);
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userListAllController(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield user_services.userListAllService();
                res.status(allUsers.status).send(allUsers.response);
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userListByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_services.userListByIdService(id);
                res.status(user.status).send(user.response);
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    userLoginController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const user = yield user_services.userLoginService(body);
                res.status(user.status).send(user.response);
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
}
exports.default = UserControllers;
