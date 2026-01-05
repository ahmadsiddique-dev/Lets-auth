import { connection } from "@/connection/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connection()



export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();

        const { email, password } = reqBody;

        console.log("1. Body data : ", reqBody);

        const user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({message: "User does not exists"}, {status: 400})
        }
        console.log("2. User exists : ", user);

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword)  return NextResponse.json({message: "User does not exists"}, {status: 400})

        const tokenData = {
            id : user._id,
            username: user.username,
            email: user.email
        }

        let token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        });

        let response = NextResponse.json({message: "Logged In successfully", success: true});

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

        return NextResponse.json({message: "Email verified successfully", success: true}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}