import { ErrorMiddleware } from "../middlewares/error.middleware"
import db from "../db/db"
import { and,eq } from "drizzle-orm";
import { users, organisations, usersToOrganisations } from "../schema"

export const createOrg = async(name:string, userId:string, description?:string| null) =>{
    if(!description){
        description = null
    }

    if(!name){
        const error = new ErrorMiddleware( "Bad Request",'Organisation name is required', 401);
        return error
    }

    try{
        const org = await db.insert(organisations).values({ 
            name,
            description
        }).returning().then(rows => rows[0]);
        
        
        if(!org){
            const error = new ErrorMiddleware( "Bad Request",'Organisation creation unsuccessful', 401);
            return error
        }

        await db.insert(usersToOrganisations).values({
            orgId: org.orgId,
            userId
        
        })
     
        return org
    }catch(err){
         console.error('Unexpected error:', err);
        return new ErrorMiddleware('Internal Server Error', 'An unexpected error occurred', 500);
    }
   

}

export const getAllUsersOrg = async(userId:string) =>{
    try{
        console.log(userId)
        const orgs = await db
                            .select()
                            .from(organisations)
                            .innerJoin(
                                usersToOrganisations,
                                eq(usersToOrganisations.orgId, organisations.orgId)
                            )
                            .where(eq(usersToOrganisations.userId, userId));

        console.log(orgs)


        return orgs
    }catch(err){
        console.error('Unexpected error:', err);
        return new ErrorMiddleware('Internal Server Error', `An unexpected error  ${err}`, 500);
    }

}

export const getOrgByID = async(orgId:string, userId:string) => {
    try{
       const org = await db
                        .select()
                        .from(organisations)
                        .innerJoin(
                            usersToOrganisations,
                            eq(usersToOrganisations.orgId, organisations.orgId)
                        )
                        .where(
                            and(
                            eq(organisations.orgId, orgId),
                            eq(usersToOrganisations.userId, userId)
                            )
                        )
                        .limit(1)
                        .then(rows => rows[0]?.organisations);

        if(!org){
            const error = new ErrorMiddleware( "Bad Request",'No such organisation exists', 401);
            return error
        }
        return org
    }catch(err){
        console.error('Unexpected error:', err);
        return new ErrorMiddleware('Internal Server Error', 'An unexpected error occurred', 500);
    }

}



export const addUsersToOrg = async(orgId:string, userId:string) => {
    try{
        const user = await db
                            .select()
                            .from(users)
                            .where(eq(users.id, userId))
                            .limit(1)
                            .then(rows => rows[0]);

        // console.log(userId, user)

        

        if(!user){
            const error = new ErrorMiddleware( "Bad Request",'No such user exists please sign up', 401);
            return error
        }


        const org = await db
                            .select()
                            .from(organisations)
                            .where(eq(organisations.orgId, orgId))
                            .limit(1)
                            .then(rows => rows[0]);

        console.log(org)

        const existingAssociation = await db
                                        .select()
                                        .from(usersToOrganisations)
                                        .where(
                                            and(
                                            eq(usersToOrganisations.userId, userId),
                                            eq(usersToOrganisations.orgId, orgId)
                                            )
                                        )
                                        .limit(1);

        if(existingAssociation.length > 0){
            const error = new ErrorMiddleware( "Bad Request",'User is already in the organisation', 401);
            return error
        }

        if(!org){
            const error = new ErrorMiddleware( "Bad Request",'No such organisation exists', 401);
            return error
        }

       const data = await db.insert(usersToOrganisations).values({
                                     userId: userId,         
                                     orgId: orgId
                            });


        return data

    }catch(err){
        console.error('Unexpected error:', err);
        return new ErrorMiddleware('Internal Server Error', 'An unexpected error occurred', 500);
    }
    
}