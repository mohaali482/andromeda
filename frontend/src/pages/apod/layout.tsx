import Page from "./page";

export default function APOD() {
    return (
        <div>
            <div className="flex flex-col-reverse gap-4 mt-8 md:flex-row md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-primary-foreground dark:text-primary">Astronomy picture of the day</h1>
                    <p className="text-primary-foreground dark:text-primary">Discover the Wonders of the Universe: A New Space Image Every Day</p>
                </div>
            </div>
            <Page />
        </div>
    )
}