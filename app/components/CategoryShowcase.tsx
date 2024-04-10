import Image from "next/image";
import { categoryItems } from "../lib/categoryItems";

export function CategoryShowcase({categoryName}:{categoryName:string}){
    const category = categoryItems.find((item)=>item.name === categoryName);
    //this is from javascript, It goes through the categoryItems array and returns the first item that matches the condition
    return(
        <div className="flex items-center">
            <Image
                src={category?.imageUrl as string}
                alt="Category Image"
                width={44}
                height={44}
            />
            <div className="flex flex-col ml-4">
                <h3 className="font-medium">{category?.title}</h3>
                <p className="text-muted-foreground text-sm">{category?.description}</p>
            </div>
        </div>
    );
}