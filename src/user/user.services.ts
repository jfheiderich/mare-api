import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

export default class UserServices {
  async userCreateService(data: IUser) {
    try {
      const { email, name, password } = data;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { status: 409, response: { error: "User already exists" } };
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: "user",
        },
      });

      const userObjToShow = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      return { status: 201, response: userObjToShow };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async userUpdateService(id: string, data: Partial<IUser>) {
    if (!id) {
      return { status: 400, response: "id is empty" };
    }

    if (data.role) {
      return { status: 400, response: "you cannot change the user's role" };
    }

    try {
      const userToUpdate = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!userToUpdate) {
        return { status: 404, response: { error: "user not found" } };
      }

      const userUpdated = await prisma.user.update({
        where: { id },
        data: {
          ...data,
          updated_at: new Date().toISOString(),
        },
      });

      const userObjToShow = {
        id: userUpdated.id,
        name: userUpdated.name,
        email: userUpdated.email,
        role: userUpdated.role,
      };

      return { status: 200, response: userObjToShow };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async userDeleteService(id: string) {
    if (!id) {
      return { status: 400, response: "id is empty" };
    }

    try {
      const userToDelete = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!userToDelete) {
        return { status: 404, response: "user not found" };
      }

      await prisma.user.delete({
        where: { id },
      });

      return {
        status: 204,
        response: "user deleted successfully",
      };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async userListAllService() {
    try {
      const users = await prisma.user.findMany();

      const usersToShow = users.map((user) => {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      });
      return { status: 200, response: usersToShow };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async userListByIdService(id: string) {
    if (!id) {
      return { status: 400, response: "id is empty" };
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        return { status: 404, response: "user not found" };
      }

      const userObjToShow = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      return { status: 200, response: userObjToShow };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }

  async userLoginService(data: { email: string; password: string }) {
    const { email, password } = data;
    if (!email || !password) {
      return { status: 400, response: { error: "invalid credentials!" } };
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { status: 404, response: { error: "user not found" } };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { status: 401, response: { error: "invalid credentials!" } };
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "24h",
      });

      const userObjToShow = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      };

      return { status: 200, response: userObjToShow };
    } catch (error) {
      return { status: 500, response: { error } };
    }
  }
}
