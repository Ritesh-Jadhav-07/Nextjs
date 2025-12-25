import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel.js"
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request : NextRequest){
    try {

        //collecting data from request body
        const reqBody = await request.json();
        const {email , password} = reqBody

        //finding user using email
        const user = await User.findOne({email})

        //checking user existence
        if(!user){
            return NextResponse.json({error : "User does not exist"},{status : 400})
        }

        //comparing password
        const validPassword = await bcryptjs.compare(password , user.password);

        //if password is wrong 
        if(!validPassword){
            return NextResponse.json({error : "Invalid Password" } ,{status : 400})
        }

        //create token data
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        //create Token
        const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET!, {expiresIn : "1h"})

        const response = NextResponse.json({
            message : "Login successful",
            success : true,
        })

        response.cookies.set("token",token,
            {httpOnly : true}
        )

        return response;

    } catch (error : any) {
        return NextResponse.json({error : error.message},{status : 500})
    }
}