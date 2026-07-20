import type { Request, Response } from "express"
import { autheticationService } from "./authentication.service"
import sendResponse from "../../utility/sendResponse";



const createUser=async(req:Request,res:Response)=>{

try {
    
    // console.log(req.body);
    const result= await autheticationService.createUserIntoDB(req.body);
    // console.log(result);

    
    sendResponse(res,{
        statusCode: 201,
        success:true,
        message: "User registered successfully",
        data: result
    })

} catch (error:unknown) {
    
    const errorMessage= error instanceof Error? error.message : "something went wrong";
   
    let statusCode=500;
    let message="Internal Server Error";
    if(errorMessage==="Invalid role"){
        statusCode=400;
        message="Invalid role";
    }

    else if(errorMessage.includes("unique constraint") || errorMessage.includes("duplicate key value")){

        statusCode=400;
        message="Email already exist";
    }
   else if(errorMessage.includes("null value in column") || errorMessage.includes("violates not-null constraint")){

        statusCode=400;
        message="Missing required fields";
    }
    sendResponse(res,{
        statusCode,
        success:false,
        message,
        errors: errorMessage
        
    })

}



}


const loginUser=async(req:Request, res: Response)=>{
  try {
    const result= await autheticationService.loginUserIntoDB(req.body);
    
    sendResponse(res,{
        statusCode: 200,
        success:true,
        message: "Login successful",
        data: result
    })

  } 
  catch (error:unknown) {
    
    const errorMessage= error instanceof Error? error.message : "something went wrong";
    
    let statusCode=500;
    let message="Internal Server Error";
    if(errorMessage==='Email and paasword are required'){
        statusCode=400;
        message='Email and paasword are required';
    }

    else if (errorMessage==='Invalid email or password'){
        statusCode=401;
        message='Invalid email or password';
    }
    
    sendResponse(res,{
        statusCode,
        success:false,
        message,
        errors: errorMessage
        
    })

}
}


export const authController={
    createUser,
    loginUser,
}