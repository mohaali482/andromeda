import { ExternalLink } from "lucide-react";

export default function Page() {
    return (
        <div className="self-stretch bg-accent/65 rounded-lg w-full flex flex-col justify-center items-start text-accent-foreground py-8 px-4">
            <p>This is a simple web application that uses the <a href="https://api.nasa.gov/" target="_blank" className="inline-flex items-center hover:underline">NASA API <ExternalLink className="inline ml-1" size={15} /></a> to display the Astronomy Picture of the Day and Mars Rover Photos.</p>
            <p>This project was created to demonstrate the use of Express, Redis, React, TypeScript and Tailwind CSS.</p>
            <p>The source code for this project is available on <a href="https://github.com/mohaali482/andromeda" target="_blank" className="inline-flex items-center hover:underline">GitHub <ExternalLink className="inline ml-1" size={15} /></a>.</p>
            <p>The backend, built using Express, is optimized with Redis caching to provide a faster, more efficient experience. By caching data from NASA's APIs, this project ensures quicker access to previously requested content, reducing load times and enhancing your overall browsing experience.</p>
        </div>
    )
}