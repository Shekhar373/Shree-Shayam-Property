import dbConnect from "@/lib/connectdb";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await dbConnect()
        const properties = await Property.find({
            featured: true,
            status:"published"
        })
        .sort({createdAt: -1})
        .limit(3)
        .lean()

        return NextResponse.json({
            success: true,
            properties,

        })
    }catch(error){
        console.error("failed ti fetch featured properties")

        return NextResponse.json(
            {success: false, message:"failed to fetch featured properties"},
            {status: 500}
        )
    }
}