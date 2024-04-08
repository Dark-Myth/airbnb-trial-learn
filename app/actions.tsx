"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";

export async function createairbnbhome({userId}:{userId:string}){
    const data = await prisma.home.findFirst({
        where:{
            userId: userId,
        },
        orderBy:{
            createdAt: 'desc',
        },
    });
    // switch better for production
    if(data===null){
        const data = await prisma.home.create({
            data:{
                userId: userId,
            },
        });
        // the above is if user has zero homes in database, then create a new home
        return redirect(`/create/${data.id}/structure`);
    }else if(
        !data.addedCategory && 
        !data.addedDescription && 
        !data.addedLocation)
        {
        return redirect(`/create/${data.id}/structure`);
    }else if(data.addedCategory && !data.addedDescription){
        return redirect(`/create/${data.id}/description`);
    }
}


//We need to create a post request
export async function createCategoryPage(formData: FormData){
    const categoryName = formData.get('categoryName');
    const homeId = formData.get('homeId');
    const data = await prisma.home.update({
        //to update at constant id
        where:{
            id:homeId as string,
            //this show error as this is not passed in the form data in the starting
        },
        data:{
            categoryName: categoryName as string,
            addedCategory: true,
        }
    });
    return redirect(`/create/${homeId}/description`);
}