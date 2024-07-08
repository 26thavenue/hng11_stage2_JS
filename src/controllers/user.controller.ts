import { type Request, type Response } from "express";
import * as userService from "../service/user.service";
import * as orgService from "../service/org.service";
import { ErrorMiddleware } from "../middlewares/error.middleware"
import db from "../db/db"
import { eq } from "drizzle-orm";
import { users } from "../schema";

export const getUserById = async(req:Request,res: Response) => {
    const userId = req.params.id

    const loggedInUser = req.user?.id

    if(!loggedInUser){
        const error = new ErrorMiddleware( "Bad Request",'You need to be Logged In', 403);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    const user = await db
                          .select()
                          .from(users)
                          .where(eq(users.id, loggedInUser))
                          .limit(1)
                          .then(rows => rows[0]);


    // console.log("loggedInUser" , loggedInUser)

    // console.log("user", "-" , user)

    if (userId == loggedInUser){
        const data = await userService.getUserById(userId)

        if(data instanceof ErrorMiddleware){
            return res.status(data.statusCode).json({status: data.status,message: data.message, statusCode: data.statusCode})
        }
         const response ={
            "status": "success",
            "message": "Successful operation",
            "data":{
                "user": {
                    "userId": data.id,
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "email": data.email,
                    "phone": data.phone
                }
                
            }
        }

        return res.status(200).json(response)
    }

    const orgs = await orgService.getAllUsersOrg(loggedInUser)
    const otherUserOrgs = await orgService.getAllUsersOrg(userId)

    if(orgs instanceof ErrorMiddleware || otherUserOrgs instanceof ErrorMiddleware){
        const error = new ErrorMiddleware('Internal Server Error', 'An unexpected error occurred', 500);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    const orgsSet = new Set(orgs.map(org => org.organisations.orgId));

    const hasCommonOrg = otherUserOrgs.some(org => orgsSet.has(org.organisations.orgId));

    if(hasCommonOrg){
        const data = await userService.getUserById(userId)
        if(data instanceof ErrorMiddleware){
            return res.status(data.statusCode).json({status: data.status,message: data.message, statusCode: data.statusCode})
        }

        const response ={
            "status": "success",
            "message": "Successful query",
            "data":{
                "userId": data.id,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "phone": data.phone
            }
        }
    

        res.status(200).json(response)
    }
    const error = new ErrorMiddleware( "Bad Request",'You do not have access to this user', 403);
    return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
 
}