declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
    };
  }
}
declare namespace Express {
  interface Request {
    customProperties: string[];
  }
}
import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
