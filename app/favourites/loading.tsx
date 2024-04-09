import { Skeletioncard } from "../components/SeletionCard";

export default function FavouritesLoading(){
    return(
        <section className="container mx-auto px-5 lg:px-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight"></h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
                <Skeletioncard/>
            </div>

        </section>
    );
}