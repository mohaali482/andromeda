import { Request, Response, NextFunction } from "express";

export default function logger() {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(
      req.method,
      req.hostname,
      req.path,
      new Date(Date.now()).toString()
    );
    next();
  };
}
