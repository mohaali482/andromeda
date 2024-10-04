import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import FilterForm from "./filter-form";
import { Rover } from "@/types/mars-rover-photos";

export default function FilterSheet({ rover }: { rover: Rover }) {
    return (
        <div className="lg:hidden mb-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <Filter className="mr-2 h-4 w-4" /> Filters
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <SheetTitle>Filter</SheetTitle>
                        <SheetDescription>
                            <FilterForm rover={rover} />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}