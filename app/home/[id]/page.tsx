/* eslint-disable @next/next/no-img-element */
import { createReservation } from "@/app/actions";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalender";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore} from "next/cache";

async function getData(homeId:string){
    noStore();
    const data = await prisma.home.findUnique({
        where:{
            id:homeId,
        },
        select:{
            photo:true,
            description:true,
            guests:true,
            bathrooms:true,
            bedrooms:true,
            title:true,
            categoryName:true,
            price:true,
            country:true,
            createdAt:true,
            User:{
                select:{
                    email:true,
                    firstname:true,
                    profileImage:true,
                }
            },
            reservation:{
                where:{
                    homeId:homeId,
                },
                select:{
                    startDate:true,
                    endDate:true,
                }
            }
        }
    });
    return data;
}


export default async function HomeRoute({
    params,
  }: {
    params: { id: string };
  }) {
    const data = await getData(params.id);
    const {getCountryByValue} = useCountries();
    const country = getCountryByValue(data?.country as string);
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return(
        <div className="w-[75%] mx-auto my-10">
            <h1 className="font-medium text-3xl mb-5">{data?.title}</h1>
            {/* Image */}
            <div className="relative h-[550px]">
                <Image 
                    alt="Image of home"
                    src={`https://xbupertldxhrpbcurnei.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                    fill
                    className="rounded-lg h-full object-cover w-full"
                />
                {/* fill property can only be used if it is under a div and that div has a relative property */}
            </div>
            {/* Essentail Info */}
            <div className="flex sm:justify-between flex-col gap-x-24 mt-8">
                <div className="sm:w-3/4 mx-2">
                    <h3 className="text-xl font-medium">{country?.flag}  {country?.label}/{country?.region}</h3>
                    <div className="flex gap-x-2 text-muted-foreground">
                    <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> * <p>{data?.bathrooms} Bathrooms</p>  
                    </div>
                    <div className="flex items-center mt-6">
                        <img src={data?.User?.profileImage ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"} alt="User Profile"
                        className="rounded-full h-11 w-11"/>
                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium">
                                Hosted by {data?.User?.firstname}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Host since {new Date(data?.createdAt as Date).getFullYear()-Math.round(Math.random()*10)}
                                {/* I just subtracted by random as I just added them all shows same year 😅 small change, But is does change after each refresh*/}
                            </p>
                        </div>
                    </div>
                    <Separator className="my-7"/>

                    <CategoryShowcase categoryName={data?.categoryName as string}/>

                    <Separator className="my-7"/>

                    <p className="text-muted-foreground">{data?.description}</p>

                    <Separator className="my-7"/>

                    <HomeMap locationValue={country?.value as string}/>
                </div>
                <form action={createReservation}>
                    <input type="hidden" name="homeId" value={params.id}/>
                    <input type="hidden" name="userId" value={user?.id}/>
                    <SelectCalender reservation={data?.reservation}/>
                    {user?.id ? <ReservationSubmitButton/> :
                    <Button className="w-full" asChild>
                        <Link href="/api/auth/login">Make a Reservation</Link>
                    </Button>}
                </form>
                
            </div>
        </div>
    );
}