import db from "../db/db"
import { ErrorMiddleware } from "../middlewares/error.middleware"
import { eq } from "drizzle-orm";
import { users } from "../schema";

export const getUserById = async(userId:string) =>{
    try{
        const [user] = await db.query.users.findMany({
                        where: eq(users.id, userId)
                        })
                                                    
        if(!user){
            const error = new ErrorMiddleware( "Bad Request",'No such user exists please sign up', 401);
            return error
        }
        return user
    }catch(err){
        console.error('Unexpected error:', err);
        return new ErrorMiddleware('Internal Server Error', 'An unexpected error occurred', 500);
    }

}

