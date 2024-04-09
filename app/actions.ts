"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/superbase";
import { revalidatePath } from "next/cache";

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
    }else if(data.addedDescription && !data.addedLocation){
        return redirect(`/create/${data.id}/address`);
    }else if(
        data.addedCategory && 
        data.addedDescription && 
        data.addedLocation){
            const data = await prisma.home.create({
                data:{
                    userId: userId,
                },
            });
            // the above is if user has zero homes in database, then create a new home
            return redirect(`/create/${data.id}/structure`);
    }
    //the above is the logic to check if the user has a home in the database and if the user has added the category, description and location
}


//We need to create a post request
export async function createCategoryPage(formData: FormData){
    const categoryName = formData.get('categoryName') as string;
    const homeId = formData.get('homeId') as string;
    const data = await prisma.home.update({
        //to update at constant id
        where:{
            id:homeId,
            //this show error as this is not passed in the form data in the starting
        },
        data:{
            categoryName: categoryName,
            addedCategory: true,
        }
    });
    return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formData: FormData){
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price');
    const imageFile = formData.get('image') as File;
    const homeId = formData.get('homeId') as string;
    const guestNumber = formData.get('guests') as string;
    const roomNumber = formData.get('rooms') as string;
    const bathroomNumber = formData.get('bathrooms') as string;
    const {data: imageData} = await supabase.storage.from("images").upload(`${imageFile.name}-${new Date()}`, imageFile,{
        cacheControl: '2592000',
        contentType:'image/png',
    });

    const data = await prisma.home.update({
        where:{
            id: homeId,
        },
        data:{
            title: title,
            description: description,
            price: Number(price),
            bedrooms: roomNumber,
            guests: guestNumber,
            bathrooms:bathroomNumber,
            photo: imageData?.path,
            addedDescription: true,
        }
    });
    return redirect(`/create/${homeId}/address`);
}


export default async function createAddress(formData: FormData){
    const countryValue = formData.get('countryValue') as string;
    const homeId = formData.get('homeId') as string;
    const data= await prisma.home.update({
        where:{
            id: homeId
        },
        data:{
            addedLocation: true,
            country: countryValue,
        }
    });
    return redirect('/');
}

export async function addToFavourite(fromData: FormData){
    const homeId = fromData.get('homeId') as string;
    const userId = fromData.get('userId') as string;
    const pathName = fromData.get('pathName') as string;
    const data = await prisma.favourite.create({
        data:{
            homeId: homeId,
            userId: userId,
            //the remaining info can be curated from the homeId
        }
    });

    //We need to add revalidate path so it does it properly from catch
    revalidatePath(pathName);
    //as we can be any where we get the path
    return redirect('/');
}


export async function deleteFromFavourite(formData: FormData){
    const favouriteId = formData.get('favouriteId') as string;
    const pathName = formData.get('pathName') as string;
    const userId = formData.get('userId') as string;
    await prisma.favourite.delete({
        where:{
            id: favouriteId,
            userId: userId,
        }
    });
    revalidatePath(pathName);
}