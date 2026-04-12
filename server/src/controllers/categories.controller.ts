import { Request, Response } from "express";
import { browserService } from "../services/result.service";

export const categoriesController = async (req:Request, res:Response) => {
    try {
        const {categoryOption} = req.body;

         if (!categoryOption) {
      return res
        .status(400)
        .json({ message: "Please Enter the Program Category First" });
    }



    } catch (error) {
        
    }
}