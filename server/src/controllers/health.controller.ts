// Controllers is used for writing the actual code.
// ### Frontend (React) → API Route (Express) → Controller (Logic) → Database (MongoDB) ##
import { Request,Response } from "express";

export const health = (req:Request,res:Response) =>{
    try{
        res.json({status:"ok",message:"Health is fine"});
    }
    catch(error){
        res.status(500).send("Something went wrong")
    }
}