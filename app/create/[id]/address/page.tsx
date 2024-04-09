"use client";

import createAddress from "@/app/actions";
// import Map from "@/app/components/Map"; //this is not needed as we use lazymap to render it on client side
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { useCountries } from "@/app/lib/getCountries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";


export default function AddressRoute({params}:{params:{id:string}}){
    const {getAllCountries} = useCountries();//we get them from useCountries hook which we made
    const [locationValue,setLocationValue]= useState("");
    //since we use useState hook we need to also add "use client"
    const LazyMap = dynamic(() => import('@/app/components/Map',), {
        ssr: false,
        loading:()=><Skeleton className="h-[50vh] w-full"/>
    },);
    //To make it render on client side

    
    return(
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
                    Where is your Home located? 
                </h2>
            </div>
            <form action={createAddress}>
                <input type="hidden" name="homeId" value={params.id}/>
                <input type="hidden" name="countryValue" value={locationValue}/>
                <div className="mx-auto w-3/5 mb-36">
                    <div className="mb-5">
                        <Select required onValueChange={(value)=>setLocationValue(value)}>
                            {/* the location value is a state that updates dynamically */}
                            <SelectTrigger className="w-full ">
                                <SelectValue placeholder="Select a Country"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        {getAllCountries().map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.flag} {item.label} /{item.region}
                                            </SelectItem>
                                            ))}
                                    </SelectLabel>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <LazyMap locationValue={locationValue}/>
                </div>
                <CreationBottomBar/>
            </form>
        </>
    )
}