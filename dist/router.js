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
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user/user.controller"));
const auth_middleware_1 = __importDefault(require("./auth/auth.middleware"));
const router = (0, express_1.Router)();
const userController = new user_controller_1.default();
/// USER -----------------------------------------------------------------------
router.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.userCreateController(req, res);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.userLoginController(req, res);
}));
router.patch("/update-user/:id", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.userUpdateController(req, res);
}));
router.delete("/delete-user/:id", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.userDeleteController(req, res);
}));
router.get("/list-all-users", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.userListAllController(res);
}));
router.get("/list-user/:id", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.userListByIdController(req, res);
}));
exports.default = router;
