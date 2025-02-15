import { Router } from "express";
import UserControllers from "./user/user.controller";
import authMiddleware from "./auth/auth.middleware";

const router = Router();
const userController = new UserControllers();

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
  await userController.userListAllController(res);
});

router.get("/list-user/:id", authMiddleware, async (req, res) => {
  await userController.userListByIdController(req, res);
});

export default router;
