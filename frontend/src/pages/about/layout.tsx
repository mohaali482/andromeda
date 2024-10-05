import Page from "./page";

export default function About() {
    return (
        <div className="flex flex-col gap-4 mt-8">
            <div>
                <h1 className="text-3xl font-bold text-primary-foreground dark:text-primary">About</h1>
            </div>
            <div>
                <Page />
            </div>
        </div>
    )
}