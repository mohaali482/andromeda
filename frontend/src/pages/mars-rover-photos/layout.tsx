import Page from "./page";

export default function MarsRoverPhotos() {
    return (
        <div>
            <div className="flex flex-col-reverse gap-4 mt-8 md:flex-row md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-primary-foreground dark:text-primary">Mars Rover Photos</h1>
                    <p className="text-primary-foreground dark:text-primary">Explore Mars Through the Eyes of Our Rovers: Select a Rover to View Mission Photos</p>
                    <p className="text-primary-foreground dark:text-primary">Click on an image to explore it in full detail.</p>
                </div>
                <img src="/images/mars.gif" alt="Mars" width={100} />
            </div>
            <Page />
        </div>
    )
}