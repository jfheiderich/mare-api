import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import CandidateControllers from "../candidate/candidate.controller";

const candidateRoutes = Router();
const candidateController = new CandidateControllers();

candidateRoutes.post("/create-candidate", async (req, res) => {
  await candidateController.candidateCreateController(req, res);
});

candidateRoutes.patch(
  "/update-candidate/:id",
  authMiddleware,
  async (req, res) => {
    await candidateController.candidateUpdateController(req, res);
  }
);

candidateRoutes.delete(
  "/delete-candidate/:id",
  authMiddleware,
  async (req, res) => {
    await candidateController.candidateDeleteController(req, res);
  }
);

candidateRoutes.get(
  "/list-all-candidates",
  authMiddleware,
  async (req, res) => {
    await candidateController.candidateListAllController(req, res);
  }
);

candidateRoutes.get("/list-candidate/:id", authMiddleware, async (req, res) => {
  await candidateController.candidateListByIdController(req, res);
});

candidateRoutes.get(
  "/list-candidate/:cpf",
  authMiddleware,
  async (req, res) => {
    await candidateController.candidateListDetailsByCPFController(req, res);
  }
);

candidateRoutes.get(
  "/list-candidate/public/:cpf",

  async (req, res) => {
    await candidateController.candidateListPublicByCPFController(req, res);
  }
);

export default candidateRoutes;
