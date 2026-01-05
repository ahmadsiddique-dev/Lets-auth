import { connection } from "@/connection/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user"
import bcrypt from "bcryptjs";
import { sendMail } from "@/helper/mailer";

connection()
 
export async function POST(request:NextRequest) {
    try {
        
        const { username, email, password } = await request.json();

        // TODO: Validation are being skipped here

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser)

        // This is mail sending portion

        await sendMail({email, emailType: "VERIFY", useId: savedUser._id})

        return NextResponse.json({message: "User Signed up Successfully", success: true, savedUser})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}