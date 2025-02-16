import { Router } from "express";
import UserControllers from "../user/user.controller";
import authMiddleware from "../auth/auth.middleware";

const userRoutes = Router();
const userController = new UserControllers();

userRoutes.post("/create-user", async (req, res) => {
  await userController.userCreateController(req, res);
});

userRoutes.post("/login", async (req, res) => {
  await userController.userLoginController(req, res);
});

userRoutes.patch("/update-user/:id", authMiddleware, async (req, res) => {
  await userController.userUpdateController(req, res);
});

userRoutes.delete("/delete-user/:id", authMiddleware, async (req, res) => {
  await userController.userDeleteController(req, res);
});

userRoutes.get("/list-all-users", authMiddleware, async (req, res) => {
  await userController.userListAllController(req, res);
});

userRoutes.get("/list-user/:id", authMiddleware, async (req, res) => {
  await userController.userListByIdController(req, res);
});

export default userRoutes;
