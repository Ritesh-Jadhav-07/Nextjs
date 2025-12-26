import {connect} from "@/dbconfig/dbconfig"
import { NextRequest , NextResponse } from "next/server"
import User from "@/models/userModel"
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error : "User Not exist"} , {status : 400})
        }

        await sendEmail({
            email : user.email,
            emailType : "RESET",
            userId : user._id
        })

        return NextResponse.json({
            message : "Reset password email sent",
            success : true,
        })


    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}