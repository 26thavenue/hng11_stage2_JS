import { type Request, type Response } from "express";
import * as orgService from "../service/org.service";
import { ErrorMiddleware } from "../middlewares/error.middleware"

export const createOrg = async(req:Request,res: Response) => {
    const userId = req.user?.id

    if(!userId){
        const error = new ErrorMiddleware( "Bad Request",'You need to be Logged In', 403);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    const {name, description} = req.body
    
    if(!name){
        const error = new ErrorMiddleware( "Bad Request",'Client Error', 400);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    const data = await orgService.createOrg(name,userId, description)

    if(data instanceof ErrorMiddleware){
        return res.status(data.statusCode).json({status: data.status,message: data.message, statusCode: data.statusCode})
    }

    const response ={
        "status": "success",
        "message": "Organisation created successfully",
        "data":{
            "orgId": data.orgId,
            "name": data.name,
            "description": data.description
        }
    }
    res.status(201).json(response)
}

export const getAllUsersOrg = async(req:Request,res: Response) => {
    const userId = req.user?.id

    if(!userId){
        const error = new ErrorMiddleware( "Bad Request",'You need to be Logged In', 403);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }



    const data = await orgService.getAllUsersOrg(userId)

    if(data instanceof ErrorMiddleware){
        return res.status(data.statusCode).json({status: data.status,message: data.message, statusCode: data.statusCode})
    }

    const response ={
        "status": "success",
        "message": "Organisations fetched successfully",
        "data": {
            "organisations":
                data.map((org:any) => {
                    return {
                        "orgId": org.organisations.orgId,
                        "name": org.organisations.name,
                        "description": org.organisations.description
                    }
                })    
            }
    }
    res.status(200).json(response)
}

export const getOrgByID = async(req:Request,res: Response) => {
    const userId = req.user?.id
    const orgId = req.params.orgId

    if(!userId){
        const error = new ErrorMiddleware( "Bad Request",'You need to be Logged In', 403);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    if(!orgId){
        const error = new ErrorMiddleware( "Bad Request",'Client Error', 400);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    const data = await orgService.getOrgByID(orgId, userId)

    if(data instanceof ErrorMiddleware){
        return res.status(data.statusCode).json({status: data.status,message: data.message, statusCode: data.statusCode})
    }

    const response ={
        "status": "success",
        "message": "Organisation fetched successfully",
        "data": {
            "orgId": data.orgId,
            "name": data.name,
            "description": data.description
        }
    }
    res.status(200).json(response)
}

export const addUsersToOrg = async(req:Request,res: Response) => {
    const userId = req.body.userId
    const id = req.user?.id
    const orgId = req.params.orgId

    if(!id){
        const error = new ErrorMiddleware( "Bad Request",'You need to be Logged In', 403);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    if(!userId){
        const error = new ErrorMiddleware( "Bad Request",'Invalid request parameters', 403);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    if(!orgId){
        const error = new ErrorMiddleware( "Bad Request",'Client Error', 400);
        return res.status(error.statusCode).json({status: error.status,message: error.message, statusCode: error.statusCode})
    }

    const data = await orgService.addUsersToOrg(orgId, userId)

    if(data instanceof ErrorMiddleware){
        return res.status(data.statusCode).json({status: data.status,message: data.message, statusCode: data.statusCode})
    }

    const response ={
        "status": "success",
        "message": "User added to organisation successfully",
    }
    res.status(201).json(response)
}