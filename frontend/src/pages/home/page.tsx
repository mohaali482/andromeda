import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Page() {
    return (
        <div className="flex flex-col-reverse items-center gap-4 my-8 md:flex-row md:justify-between">
            <div className="bg-accent/65 rounded-lg max-w-full w-fit h-full text-accent-foreground py-4 px-4">
                <h1 className="text-3xl font-bold">Welcome to the Andromeda</h1>
                <p>Explore the Universe. Discover breathtaking images and data from NASA</p>
                <div className="flex gap-4 mt-8 flex-col md:flex-row">
                    <Button variant={"secondary"}><Link to="/apod">View Astronomy Picture of the Day</Link></Button>
                    <Button><Link to="/mars-rover-photos">Explore Mars Photos</Link></Button>
                </div>
            </div>
            <img src="/images/icon.png" alt="Andromeda" className="w-72 h-72 object-cover" />
        </div>
    )
}