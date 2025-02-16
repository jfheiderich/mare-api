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
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const candidate_controller_1 = __importDefault(require("../candidate/candidate.controller"));
const candidateRoutes = (0, express_1.Router)();
const candidateController = new candidate_controller_1.default();
candidateRoutes.post("/create-candidate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidateController.candidateCreateController(req, res);
}));
candidateRoutes.patch("/update-candidate/:id", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidateController.candidateUpdateController(req, res);
}));
candidateRoutes.delete("/delete-candidate/:id", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidateController.candidateDeleteController(req, res);
}));
candidateRoutes.get("/list-all-candidates", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidateController.candidateListAllController(req, res);
}));
candidateRoutes.get("/list-candidate/:id", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidateController.candidateListByIdController(req, res);
}));
candidateRoutes.get("/list-candidate/:cpf", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidateController.candidateListDetailsByCPFController(req, res);
}));
candidateRoutes.get("/list-candidate/public/:cpf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidateController.candidateListPublicByCPFController(req, res);
}));
exports.default = candidateRoutes;
