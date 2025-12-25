import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";

export const getDataFromToken = (request : NextRequest)=>{
    try {

        //token present on cookies
        const token = request.cookies.get("token")?.value || '';

        //comparing with our token secret
        const decodedToken : any = jwt.verify(token , process.env.TOKEN_SECRET!)

        //returning id of token
        return decodedToken.id;

    } catch (error : any) {
        throw new Error(error.message)
    }
}