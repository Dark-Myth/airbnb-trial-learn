"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Counter } from "./Counter";
import { Card, CardHeader } from "@/components/ui/card";

export function SearchModelCOmponent(){

    const [step, setStep] = useState(1);
    const {getAllCountries} = useCountries();//we get them from useCountries hook which we made
    const [locationValue,setLocationValue]= useState("");
    function SubmitFunction(){
        if(step === 1){
            return(
                <Button onClick={()=>{setStep(step+1)}} type="button">
                    Next
                </Button>
            );
        }else if(step === 2){
            return(
                <CreationSubmit/>
                //transition submit
            );
        }
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full py-2 px-5 border flex flex-items cursor-pointer">
                    <div className="flex h-full divide-x font-medium pt-1">
                    <p className="px-4">Anywhere</p>
                    <p className="px-4">Any Week</p>
                    <p className="px-4">Any Guests</p>
                    </div>
                    <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full"/>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px] ">
                {/*this is a multi state form so we will have to use a state*/}
                <form className="gap-5 flex flex-col">
                    <input type="hidden" name="country" value={locationValue}/>
                    {/* Since this is a get rather than post action will not be required*/}
                    {step === 1 ?(<>
                        <DialogHeader>
                            <DialogTitle>
                                Select a Country
                            </DialogTitle>
                            <DialogDescription>
                                Please select a country to enjoy the best experience
                            </DialogDescription>
                        </DialogHeader>
                        <Select required onValueChange={(value)=>setLocationValue(value)} value={locationValue}>
                            {/* the location value is a state that updates dynamically */}
                            <SelectTrigger className="w-full">
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
                        <HomeMap locationValue={locationValue}/>

                    </>):(<>
                        <DialogHeader>
                            <DialogTitle>
                                Select required home details
                            </DialogTitle>
                            <DialogDescription>
                                Please select the details you need to enjoy the best experience
                            </DialogDescription>
                        </DialogHeader>
                        <Card>
                            <CardHeader
                                className="flex flex-col gap-y-5"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                            <h3 className="underline font-medium">Guests</h3>
                                            <p className="text-muted-foreground text-sm">
                                                How many guests do you want?
                                            </p>
                                    </div>
                                    <Counter name="guests"/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                            <h3 className="underline font-medium">Rooms</h3>
                                            <p className="text-muted-foreground text-sm">
                                                How many rooms do you have?
                                            </p>
                                    </div>
                                    <Counter name="rooms"/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                            <h3 className="underline font-medium">Bathrooms</h3>
                                            <p className="text-muted-foreground text-sm">
                                                How many bathrooms do you have?
                                            </p>
                                    </div>
                                    <Counter name="bathrooms"/>
                                </div>
                            </CardHeader>
                        </Card>

                    </>)}
                    <DialogFooter>
                        <SubmitFunction/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}