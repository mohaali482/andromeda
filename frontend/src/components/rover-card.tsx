import { Rover } from "@/types/mars-rover-photos";
import { Card, CardContent, CardFooter } from "./ui/card";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Check, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export default function RoverItem({ rover, selectedItem }: { rover: Rover, selectedItem: string }) {
    return (
        <>
            <Card className={`flex flex-col overflow-hidden h-full transition-all ${selectedItem === rover.name
                ? "ring-2 ring-primary"
                : "hover:bg-secondary"
                }`}>
                <CardContent className="p-4">
                    <RadioGroupItem value={rover.name} id={rover.name} className="peer sr-only" />
                    <Label
                        htmlFor={rover.name}
                        className="block cursor-pointer"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                                <img
                                    src={rover.image}
                                    alt={rover.alt}
                                    className="rounded-full object-cover w-20 h-20"
                                />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold mb-1 capitalize">{rover.name}</h3>
                                <p className="text-sm text-muted-foreground">{rover.description}</p>
                            </div>
                        </div>
                    </Label>
                </CardContent>
                {
                    selectedItem === rover.name && (
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-0.5">
                            <Check className="h-3 w-3" />
                        </div>
                    )
                }
                <CardFooter className="pb-2 mt-auto">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto mt-auto"
                        asChild
                    >
                        <a href={rover.moreInfo} target="_blank">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            More Info
                        </a>
                    </Button>
                </CardFooter>
            </Card >
        </>
    )
}