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
const candidate_services_1 = __importDefault(require("./candidate.services"));
const candidate_services = new candidate_services_1.default();
class CandidateControllers {
    candidateCreateController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const candidate = yield candidate_services.candidateCreateService(body);
                res.status(candidate.status).send(candidate.response);
            }
            catch (error) {
                res.status(500).json({ error: error || "Internal Server Error" });
            }
        });
    }
    candidateUpdateController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const id = req.params.id;
                const candidate = yield candidate_services.candidateUpdateService(id, body);
                res.status(candidate.status).send(candidate.response);
            }
            catch (error) {
                res.status(500).json({ error: error || "Internal Server Error" });
            }
        });
    }
    candidateDeleteController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const candidate = yield candidate_services.candidateDeleteService(id);
                res.status(candidate.status).send(candidate.response);
            }
            catch (error) {
                res.status(500).json({ error: error || "Internal Server Error" });
            }
        });
    }
    candidateListAllController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCandidates = yield candidate_services.candidatesListAllService();
                res.status(allCandidates.status).send(allCandidates.response);
            }
            catch (error) {
                res.status(500).json({ error: error || "Internal Server Error" });
            }
        });
    }
    candidateListByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const candidate = yield candidate_services.candidateListByIdService(id);
                res.status(candidate.status).send(candidate.response);
            }
            catch (error) {
                res.status(500).json({ error: error || "Internal Server Error" });
            }
        });
    }
}
exports.default = CandidateControllers;
