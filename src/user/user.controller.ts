import UserServices from "./user.services";
import { IUser } from "./user.types";

const user_services = new UserServices();

export default class UserControllers {
  async userCreateController(req, res) {
    try {
      const body = req.body as IUser;
      const user = await user_services.userCreateService(body);
      res.status(user.status).send(user.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async userUpdateController(req, res) {
    try {
      const body = req.body;
      const id = req.params.id;
      const user = await user_services.userUpdateService(id, body);
      res.status(user.status).send(user.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async userDeleteController(req, res) {
    try {
      const id = req.params.id;
      const user = await user_services.userDeleteService(id);
      res.status(user.status).send(user.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async userListAllController(req: Request, res) {
    try {
      const allUsers = await user_services.userListAllService();
      res.status(allUsers.status).send(allUsers.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async userListByIdController(req, res) {
    try {
      const id = req.params.id;
      const user = await user_services.userListByIdService(id);
      res.status(user.status).send(user.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }

  async userLoginController(req, res) {
    try {
      const body = req.body;
      const user = await user_services.userLoginService(body);
      res.status(user.status).send(user.response);
    } catch (error) {
      res.status(500).json({ error: error || "Internal Server Error" });
    }
  }
}
