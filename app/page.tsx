import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";
import { Skeletoncard } from "@/app/components/SeletonCard";
import { NoItems } from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore} from "next/cache";
//to fetch out data we would use standard async function { so we basically get our data from the database and pass it to the component}
async function getData({searchParams,userId}:{
  userId: string | undefined,
  searchParams?:{
  filter?:string;
  country?:string;
  guests?:string;
  rooms?:string;
  bathrooms?:string;
}}) {
  noStore();
  const data = await prisma.home.findMany({
    where:{
      addedCategory: true,
      addedLocation: true,
      addedDescription:true,
      categoryName:searchParams?.filter ?? undefined,
      // the undefined is used to check if the filter is not present, prisma will ignore if this is undefined
      country:searchParams?.country ?? undefined,
      guests:searchParams?.guests ?? undefined,
      bedrooms:searchParams?.rooms ?? undefined,
      bathrooms:searchParams?.bathrooms ?? undefined,
    },
    select:{
      photo:true,
      id:true,
      description:true,
      country:true,
      price:true,
      favourite:{
        where:{
          userId:userId ?? undefined
          //If we basically don't have a user id we would ignore the favourite
        }
      }
    }
  });
  return data;
}
//since we need to call the function in the component we would use useEffect


export default function Home({searchParams}:{searchParams?:{
  filter?:string;
  country?:string;
  guests?:string;
  rooms?:string;
  bathrooms?:string;
}}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems/>

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading/>}>
        <ShowItems searchParams={searchParams}/>
      </Suspense>
      
    </div>
  );
}

// for pending state we would use the skeleton loader but since we are going to create a new async function and render over the listing card

async function ShowItems({searchParams}:{searchParams?:{
  filter?:string;
  country?:string;
  guests?:string;
  rooms?:string;
  bathrooms?:string;
}}){
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  const data = await getData({searchParams:searchParams,userId:user?.id});

  return(
      <>
      {/* If there is items to display or not */}
      {data.length === 0 ? (
        <NoItems title="Sorry no Listings found for this category found..." description="Please check another category or create your own listing!" />
      ):(
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
        {data.map((item) => (
          <ListingCard 
            key={item.id}
            description={item.description as string}
            imagePath={item.photo as string}
            location={item.country as string}
            price={item.price as number}
            userId={user?.id}
            favouriteId={item.favourite[0]?.id}
            homeId={item.id}
            pathName="/"
            //index since we want to revalidate the path name
            isInFavourites={item.favourite.length > 0? true:false} //since true =1 if greater means true
          />
        ))}
      </div>
      )}
      </>
  )
}

function SkeletonLoading(){
  return(
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
      <Skeletoncard/>
      <Skeletoncard/>
      <Skeletoncard/>
      <Skeletoncard/>
      <Skeletoncard/>
      <Skeletoncard/>
      <Skeletoncard/>
      <Skeletoncard/>
    </div>
  )
}