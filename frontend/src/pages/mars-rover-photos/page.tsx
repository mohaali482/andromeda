import FilterCard from "@/components/filter-card";
import FilterSheet from "@/components/filter-sheet";
import PhotoGallery from "@/components/photo-gallery";
import RoverItem from "@/components/rover-card";
import { RadioGroup } from "@/components/ui/radio-group";
import { RoverList } from "@/constants/data";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Page() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedItem, setSelectedItem] = useState<string>(searchParams.get("rover")?.toLowerCase() || "curiosity");

    const rover = RoverList.find((rover) => rover.name === selectedItem);

    useEffect(() => {
        const rover = RoverList.find((rover) => rover.name === selectedItem);
        if (!rover) {
            return;
        }
        const cameras = rover.cameras;
        const camera = searchParams.get("camera")?.toLowerCase() || "all";

        if (cameras.includes(camera.toLowerCase())) {
            searchParams.set("rover", selectedItem);
            searchParams.set("camera", camera);
        } else {
            searchParams.set("rover", selectedItem);
            searchParams.set("camera", "all");
        }

        const page = searchParams.get("page")
        if (!page || Number.isNaN(parseInt(page)) || parseInt(page) < 1) {
            searchParams.set("page", "1");
        }

        if (searchParams.get("earth_date")) {
            searchParams.delete("sol");
        } else if (searchParams.get("sol")) {
            searchParams.delete("earth_date");
        } else {
            searchParams.set("sol", "1000");
        }

        setSearchParams(searchParams);
    }, [searchParams, selectedItem]);

    return (
        <div>
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-between my-8">
                <div className="container mx-auto px-4 py-8">
                    <RadioGroup
                        value={selectedItem || ""}
                        onValueChange={setSelectedItem}
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {RoverList.map((rover, index) => (
                            <div key={index} className="relative">
                                <RoverItem selectedItem={selectedItem} rover={rover} />
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>

            {rover && (
                <div className="container mx-auto px-4 py-8 block lg:flex lg:gap-2">
                    <FilterCard rover={rover} />
                    <FilterSheet rover={rover} />
                    <PhotoGallery />
                </div>
            )}
        </div>
    )

}
