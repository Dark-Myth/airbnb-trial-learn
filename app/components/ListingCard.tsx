import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { addToFavourite, deleteFromFavourite } from "../actions";
import { AddToFavouriteButton, DeleteFromFavouriteButton } from "./SubmitButtons";


//Note AddToFavouriteButton and DeleteFromFavouriteButton are components

//Note addToFavourite and deleteFromFavourite are functions that work on the database


//interface App
interface AppProps{
    imagePath: string;
    description: string;
    location: string;
    price: number;
    userId: string| undefined;
    isInFavourites?: boolean;
    favouriteId?: string;
    homeId: string;
    pathName: string;
}
export function ListingCard({
    description,
    imagePath,
    location,
    price,
    userId,
    isInFavourites,
    favouriteId,
    homeId,
    pathName
}:AppProps){
    const {getCountryByValue} = useCountries();
    const country = getCountryByValue(location);
    return(
        <div className="flex flex-col">
            <div className="relative h-72">
                <Image
                    src={`https://xbupertldxhrpbcurnei.supabase.co/storage/v1/object/public/images/${imagePath}`} //This should be given the correct path to the image from the database, the above is a sample
                    alt="Image of House"
                    fill 
                    //alternative for f or w
                    className="rounded-lg h-full object-cover"
                />
                {userId && (
                    <div className="z-10 absolute top-2 right-2">
                        {isInFavourites ? 
                        (<form action={deleteFromFavourite}>
                            <input type="hidden" name="favouriteId" value={favouriteId}/>
                            <input type="hidden" name="userId" value={userId}/>
                            <input type="hidden" name="pathName" value={pathName}/>
                            <DeleteFromFavouriteButton/>
                        </form>):(<form action={addToFavourite}>
                            <input type="hidden" name="homeId" value={homeId}/>
                            <input type="hidden" name="userId" value={userId}/>
                            <input type="hidden" name="pathName" value={pathName}/>
                            <AddToFavouriteButton/>
                        </form>)}
                    </div>
                )}
            </div>
            {/* The below is for the idividual home listing {basically where each home is showcased} */}
            <Link href={`/home/${homeId}`} className="mt-2">
                <h3 className="font-medium text-base">
                    {country?.flag} {country?.label} / {country?.region}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                    {description}
                </p>
                <p className="pt-2 text-muted-foreground">
                    <span className="font-medium text-black">${price}</span>  Night
                </p>
            </Link>
        </div>
    );
}