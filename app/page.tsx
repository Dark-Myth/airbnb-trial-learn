import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";
import { Skeletioncard } from "@/app/components/SeletionCard";
import { NoItems } from "./components/NoItems";
//to fetch out data we would use standard async function
async function getData({searchParams}:{searchParams?:{
  filter?:string;
}}) {
  const data = await prisma.home.findMany({
    where:{
      addedCategory: true,
      addedLocation: true,
      addedDescription:true,
      categoryName:searchParams?.filter ?? undefined,
      // the undefined is used to check if the filter is not present, prisma will ignore if this is undefined
    },
    select:{
      photo:true,
      id:true,
      description:true,
      country:true,
      price:true,
    }
  });
  return data;
}
//since we need to call the function in the component we would use useEffect


export default function Home({searchParams}:{searchParams?:{
  filter?:string;
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
}}){
  const data = await getData({searchParams:searchParams});

  return(
      <>
      {/* If there is items to display or not */}
      {data.length === 0 ? (
        <NoItems/>
      ):(
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
        {data.map((item) => (
          <ListingCard 
            key={item.id}
            description={item.description as string}
            imagePath={item.photo as string}
            location={item.country as string}
            price={item.price as number}
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
      <Skeletioncard/>
      <Skeletioncard/>
      <Skeletioncard/>
      <Skeletioncard/>
      <Skeletioncard/>
      <Skeletioncard/>
      <Skeletioncard/>
      <Skeletioncard/>
      <Skeletioncard/>
    </div>
  )
}