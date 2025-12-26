import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import {connect} from "@/dbconfig/dbconfig"

connect();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {token , newPassword} = reqBody;

        const user = await User.findOne({
            forgotPasswordToken : token,
            forgotPasswordTokenExpiry : {$gt : Date.now()},
        });

        if(!user){
            return NextResponse.json({error : "Invalid token"},{status : 400})
        }

        const newHashedPassword = await bcryptjs.hash(newPassword ,10);

        user.password = newHashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message : "Password changed Succesfully"} ,{status : 200})

    } catch (error : any) {
        return NextResponse.json({error : error.message} ,{status : 500})
    }
}

