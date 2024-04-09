import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./SubmitButtons";

export function CreationBottomBar(){
    return(
        <div>
            <div className="fixed w-full bottom-0 bg-white border-t h-24">
          <div className="flex items-center justify-between mx-auto lg:px-10 h-full">
            <Button variant="secondary" size="lg">
              <Link href="/">Cancel</Link>
            </Button>
            <CreationSubmit/>
          </div>
        </div>
        </div>
    )
}