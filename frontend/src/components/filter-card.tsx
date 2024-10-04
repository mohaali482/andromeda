import { Rover } from "@/types/mars-rover-photos";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import FilterForm from "./filter-form";

export default function FilterCard({ rover }: { rover: Rover }) {
    return (
        <Card className="h-fit w-fit hidden lg:block">
            <CardHeader>
                <CardTitle>Filter</CardTitle>
                <CardDescription>Filter the photos by:</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <FilterForm rover={rover} />
            </CardContent>
        </Card>
    )
}