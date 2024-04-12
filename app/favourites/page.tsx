import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItems";
import { ListingCard } from "../components/ListingCard";
import { unstable_noStore as noStore} from "next/cache";
//this is a server side function

//since we are getting all the user favourites, we need to create a get request
async function getData(userId:string){
    noStore();
    const data = await prisma.favourite.findMany({
        where:{
            userId: userId,
        },
        select:{
            Home:{
                select:{
                    photo:true,
                    id: true,
                    favourite:true,
                    price:true,
                    country:true,
                    description:true,               
                }
            }
        }
    });
    return data;
}





export default async function FavouriteHome() {
    //Note that we are getting the user id here then only passing it to the getData function

    //Note as we can get the session id from kinde we can find the user id at any point of time
    const {getUser} = getKindeServerSession(); //predefined function
    const user = await getUser();
    if (!user){
        redirect("/"); //redirection if no login to index page
    }
    const data = await  getData(user.id); //this is normal function where we pass normal values


    return(
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">My Favourites</h2>
            {/* data.length === 0 check if there are no favourites */}
            {data.length === 0 ? (
            <NoItems title="Hey you don't have any favourites" description="Please add favourites to see them here..."/>):(
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
                    {data.map((item)=>(
                        <ListingCard
                            key={item.Home?.id}
                            description={item.Home?.description as string}
                            location={item.Home?.country as string}
                            pathName="/favourites"
                            price={item.Home?.price as number}
                            homeId={item.Home?.id as string}
                            imagePath={item.Home?.photo as string}
                            userId={user.id}
                            favouriteId={item.Home?.favourite[0].id as string}
                            isInFavourites={item.Home?.favourite.length as number > 0 ? true : false}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}