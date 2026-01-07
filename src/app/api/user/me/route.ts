import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)

        const user = await User.findOne({_id: userId}).select("-password")

        if (!user) return NextResponse.json({message: "User not Found", data: "nothing"})

        return NextResponse.json({
            message: "User Found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({message: "Some Error Occured while geting User", data: "nothing"})
    }
    
}