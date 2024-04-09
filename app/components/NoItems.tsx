import { File } from "lucide-react";

export function NoItems(){
    return(
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed text-center p-8 animate-in fade-in-50 mt-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <File className="h-10 w-10 text-primary"/>
            </div>
            <h2 className="mt-6 text-xl font-medium">
                Sorry no Listings for this category found... 
            </h2>
            <p className="mt-2 text-sm text-center text-muted-foreground">
                Please check another category or create your own listing!
            </p>
        </div>
    );
}