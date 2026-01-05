import { connection } from "@/connection/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connection()



export async function GET(request:NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Successfully Logged out",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}