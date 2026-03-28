import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env";

export const apiKeyMiddleware = (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const key = req.headers["x-api-key"];

    if(key !== ENV.API_KEY){
        return res.status(403).json({message:"Unauthorized"});
    }
    next();
}