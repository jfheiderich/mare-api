import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next({ status: 401, response: { error: "unauthorized" } });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    req.user = { userId: decoded.userId as string };

    next();
  } catch (error) {
    return next({ status: 401, response: { error: "unauthorized" } });
  }
};

export default authMiddleware;
