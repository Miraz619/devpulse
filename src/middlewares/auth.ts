


import {type NextFunction, type Request, type Response} from "express";
import jwt, { type JwtPayload }  from 'jsonwebtoken';
import { config } from "../config";


import type { ROLES } from "../types";
import sendResponse from "../utility/sendResponse";
import { pool } from "../db";






const auth =(...roles:ROLES[])=>{

 
      return async (req:Request,res:Response,next:NextFunction)=>{
  
        // console.log(roles);
    
   try {
    
     const token=req.headers.authorization;

    if(!token){
     
        throw new Error('Token is not provided');
    
    }

    const decoded=jwt.verify(token as string,config.jwt_secret as string) as JwtPayload;
    // console.log(decoded);

    const userData=await pool.query(`
      
      SELECT * FROM users WHERE email =$1
      `,[decoded.email])

      // console.log(userData);
   if(userData.rows.length===0){

    throw new Error('user not found');
   }


   const user=userData.rows[0];

 
    if(roles.length && !roles.includes(user.role)){
            
     throw new Error('Forbidden');

    }

   req.user=decoded
      next();
    

   } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "something went wrong";

    let statusCode = 401;
    let message = "Unauthorized";
    if (errorMessage === "Token is not provided") {
      statusCode = 401;
      message = "Token is not provided";
    } else if (errorMessage === "user not found") {
      statusCode = 401;
      message = "user not found";
    }
    else if (errorMessage === "Forbidden") {
      statusCode = 403;
      message = "Forbidden";
    }

    sendResponse(res, {
      statusCode,
      success: false,
      message,
      errors: errorMessage,
    });
  }
}
}
export default auth
