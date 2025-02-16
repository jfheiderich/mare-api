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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CandidateServices {
    candidateCreateService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { birthDate, cep, city, courses, cpf, education, experiences, gender, name, neighborhood, pcd, phone, race, note, registration_via, } = data;
                const existingCandidate = yield prisma.candidate.findUnique({
                    where: { cpf },
                });
                if (existingCandidate) {
                    return { status: 409, response: { error: "candidate already exists" } };
                }
                const missingFields = [];
                if (!birthDate)
                    missingFields.push("birthDate");
                // if (!cep) missingFields.push("cep");
                if (!city)
                    missingFields.push("city");
                // if (!courses) missingFields.push("courses");
                if (!cpf)
                    missingFields.push("cpf");
                if (!education)
                    missingFields.push("education");
                if (!experiences)
                    missingFields.push("experiences");
                if (!gender)
                    missingFields.push("gender");
                if (!name)
                    missingFields.push("name");
                if (!neighborhood)
                    missingFields.push("neighborhood");
                if (!pcd)
                    missingFields.push("pcd");
                if (!phone)
                    missingFields.push("phone");
                // if (!race) missingFields.push("race");
                // if (!state) missingFields.push("state");
                // if (!registration_via) missingFields.push("registration_via");
                if (missingFields.length > 0) {
                    return {
                        status: 400,
                        response: `The following fields are missing: ${missingFields.join(", ")}`,
                    };
                }
                const objCandidate = {
                    birthDate,
                    cep,
                    city,
                    courses,
                    cpf,
                    education,
                    gender,
                    name,
                    neighborhood,
                    pcd,
                    phone,
                    race,
                    note,
                    registration_via,
                    state: "Espírito Santo",
                };
                const candidate = yield prisma.candidate.create({
                    data: Object.assign(Object.assign({}, objCandidate), { experiences: {
                            create: experiences,
                        } }),
                });
                const candidateObjToShow = Object.assign({ id: candidate.id }, objCandidate);
                return { status: 201, response: candidateObjToShow };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    candidateUpdateService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return { status: 400, response: "id is empty" };
            }
            try {
                const candidateToUpdate = yield prisma.candidate.findFirst({
                    where: { id },
                });
                if (!candidateToUpdate) {
                    return { status: 404, response: { error: "candidate not found" } };
                }
                const updatedData = Object.assign(Object.assign({}, data), { updated_at: new Date().toISOString() });
                if (data.experiences) {
                    updatedData.experiences = {
                        upsert: data.experiences.map((experience) => ({
                            where: { id: experience.id },
                            update: Object.assign({}, experience),
                            create: Object.assign({}, experience),
                        })),
                    };
                }
                const candidateUpdated = yield prisma.candidate.update({
                    where: { id },
                    data: updatedData,
                });
                return { status: 200, response: candidateUpdated };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    candidateDeleteService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return { status: 400, response: "id is empty" };
            }
            try {
                const candidateToDelete = yield prisma.candidate.findFirst({
                    where: {
                        id,
                    },
                });
                if (!candidateToDelete) {
                    return { status: 404, response: "candidate not found" };
                }
                yield prisma.candidate.delete({
                    where: { id },
                });
                return {
                    status: 204,
                    response: "candidate deleted successfully",
                };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    candidatesListAllService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidates = yield prisma.candidate.findMany();
                return { status: 200, response: candidates };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    candidateListByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return { status: 400, response: "id is empty" };
            }
            try {
                const candidate = yield prisma.candidate.findFirst({
                    where: {
                        id,
                    },
                });
                if (!candidate) {
                    return { status: 404, response: "candidate not found" };
                }
                return { status: 200, response: candidate };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    candidateListDetailsByCPFService(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cpf) {
                return { status: 400, response: "CPF is empty" };
            }
            try {
                const candidate = yield prisma.candidate.findFirst({
                    where: {
                        cpf,
                    },
                });
                if (!candidate) {
                    return { status: 404, response: "candidate not found" };
                }
                return { status: 200, response: candidate };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
    candidateListPublicByCPFService(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cpf) {
                return { status: 400, response: "CPF is empty" };
            }
            try {
                const candidate = yield prisma.candidate.findFirst({
                    where: {
                        cpf,
                    },
                });
                if (!candidate) {
                    return { status: 404, response: "candidate not found" };
                }
                const responsePublic = {
                    name: candidate.name,
                    created_at: candidate.created_at,
                    is_active: candidate.destroyed_at ? false : true,
                };
                return { status: 200, response: responsePublic };
            }
            catch (error) {
                return { status: 500, response: { error } };
            }
        });
    }
}
exports.default = CandidateServices;
