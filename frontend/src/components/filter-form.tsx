import { Rover } from "@/types/mars-rover-photos";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { marsPhotoError, marsPhotoLoading, marsPhotosCount } from "@/atoms/mars-photo";
import { useAtom } from "jotai";

export default function FilterForm({ rover }: { rover: Rover }) {
    const [count, _setCount] = useAtom(marsPhotosCount);
    const [loading, _setLoading] = useAtom(marsPhotoLoading);
    const [error, _setError] = useAtom(marsPhotoError);

    const [searchParams, setSearchParams] = useSearchParams();
    const [camera, setCamera] = useState("all");
    const [selectedOption, setSelectedOption] = useState("sol");
    const [earthDate, setEarthDate] = useState(new Date().toISOString().split('T')[0]);
    const [sol, setSol] = useState("1000");

    const handleSubmit = () => {
        searchParams.set("camera", camera);
        searchParams.set("page", "1");
        if (selectedOption === "earth_date") {
            searchParams.set("earth_date", earthDate);
            searchParams.delete("sol");
        } else {
            searchParams.set("sol", sol);
            searchParams.delete("earth_date");
        }
        setSearchParams(searchParams);
    }

    const prevPage = () => {
        const page = parseInt(searchParams.get("page") || "1");
        if (page > 1) {
            searchParams.set("page", (page - 1).toString());
            setSearchParams(searchParams);
        }
    }

    const nextPage = () => {
        const page = parseInt(searchParams.get("page") || "1");
        searchParams.set("page", (page + 1).toString());
        setSearchParams(searchParams);
    }

    const hasNextPage = () => {
        return !loading && count === 25 && error === null;
    }

    const hasPrevPage = () => {
        return !loading && parseInt(searchParams.get("page") || "1") > 1;
    }


    useEffect(() => {
        if (searchParams.get("camera")) {
            setCamera(searchParams.get("camera") || "all");
        }
        if (searchParams.get("earth_date")) {
            setSelectedOption("earth_date");
            setEarthDate(searchParams.get("earth_date") || new Date().toISOString().split('T')[0]);
        } else {
            setSelectedOption("sol");
            setSol(searchParams.get("sol") || "1000");
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col gap-4 min-w-fit w-48">
            <RadioGroup value={camera} onValueChange={(value) => setCamera(value)}>
                {rover.cameras.map((camera) => (
                    <div className="flex items-center space-x-2" key={camera}>
                        <RadioGroupItem value={camera} id={camera} />
                        <Label htmlFor={camera} className="capitalize">{camera}</Label>
                    </div>
                ))}
            </RadioGroup>
            <Select value={selectedOption} onValueChange={setSelectedOption}>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="sol">Martian sol</SelectItem>
                    <SelectItem value="earth_date">Earth date</SelectItem>
                </SelectContent>
            </Select>
            {
                selectedOption === "earth_date" ? (
                    <Input type="date" max={new Date().toISOString().split('T')[0]} value={earthDate} onChange={(e) => setEarthDate(e.currentTarget.value)} />
                ) : (
                    <Input type="number" placeholder="Enter Martian sol" value={sol} onChange={(e) => setSol(e.currentTarget.value)} />
                )
            }
            <Button onClick={handleSubmit}>Submit</Button>
            <div className="flex justify-between">
                <Button onClick={prevPage} disabled={!hasPrevPage()}>Prev</Button>
                <Button onClick={nextPage} disabled={!hasNextPage()}>Next</Button>
            </div>
        </div>
    )
}