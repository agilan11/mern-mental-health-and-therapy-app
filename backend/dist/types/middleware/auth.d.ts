import { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}
declare const verifyToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default verifyToken;
