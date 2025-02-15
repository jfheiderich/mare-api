import { Router } from "express";
import UserControllers from "./user/user.controller";
import authMiddleware from "./auth/auth.middleware";
import CandidateControllers from "./candidate/candidate.controller";

const router = Router();
const userController = new UserControllers();
const candidateController = new CandidateControllers();

/// USER -----------------------------------------------------------------------
router.post("/create-user", async (req, res) => {
  await userController.userCreateController(req, res);
});

router.post("/login", async (req, res) => {
  await userController.userLoginController(req, res);
});

router.patch("/update-user/:id", authMiddleware, async (req, res) => {
  await userController.userUpdateController(req, res);
});

router.delete("/delete-user/:id", authMiddleware, async (req, res) => {
  await userController.userDeleteController(req, res);
});

router.get("/list-all-users", authMiddleware, async (req, res) => {
  await userController.userListAllController(req, res);
});

router.get("/list-user/:id", authMiddleware, async (req, res) => {
  await userController.userListByIdController(req, res);
});

//CANDIDATE---------------------------------------------------------------------
router.post("/create-candidate", async (req, res) => {
  await candidateController.candidateCreateController(req, res);
});

router.patch("/update-candidate/:id", authMiddleware, async (req, res) => {
  await candidateController.candidateUpdateController(req, res);
});

router.delete("/delete-candidate/:id", authMiddleware, async (req, res) => {
  await candidateController.candidateDeleteController(req, res);
});

router.get("/list-all-candidates", authMiddleware, async (req, res) => {
  await candidateController.candidateListAllController(req, res);
});

router.get("/list-candidate/:id", authMiddleware, async (req, res) => {
  await candidateController.candidateListByIdController(req, res);
});

export default router;
