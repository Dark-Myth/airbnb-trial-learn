
import { createCategoryPage } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { SelectCategory } from "@/app/components/SelectedCategory";
import { CreationSubmit } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StrucutreRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        {/* [id] is dynamic we can get is from params */}
        <SelectCategory/>
        <div className="fixed w-full bottom-0 bg-white border-t h-24">
          <div className="flex items-center justify-between mx-auto lg:px-10 h-full">
            <Button variant="secondary" size="lg">
              <Link href="/">Cancel</Link>
            </Button>
            <CreationSubmit/>
            
          </div>
          <CreationBottomBar/>
        </div>
      </form>
    </>
  );
}