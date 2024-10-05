import { ExternalLink } from "lucide-react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSearchParams } from "react-router-dom";
import 'react-photo-view/dist/react-photo-view.css';
import { Button, buttonVariants } from "@/components/ui/button";
import { useGetApod } from "@/hooks/useGetApod";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Home() {
    const today = new Date();

    const [searchParams, setSearchParams] = useSearchParams()
    const { error, data, status, refetch } = useGetApod(searchParams.get("date") || today.toISOString().split("T")[0]);
    const date = new Date(searchParams.get("date") || today);
    date.setDate(date.getDate() + 1);
    const hasNext = date <= today;

    const prevDate = () => {
        const date = new Date(searchParams.get("date") || today);
        date.setDate(date.getDate() - 1);
        setSearchParams({ date: date.toISOString().split("T")[0] });
    }

    const nextDate = () => {
        const date = new Date(searchParams.get("date") || today);
        date.setDate(date.getDate() + 1);
        setSearchParams({ date: date.toISOString().split("T")[0] });
    }

    useEffect(() => {
        if (searchParams.get("date") === null) {
            setSearchParams({ date: today.toISOString().split("T")[0] });
        }
    }, [])

    if (status === "error") {
        if (error) {
            return (
                <div className="pt-4">
                    <div className="flex flex-col justify-center items-center bg-background/85 rounded-lg py-8">
                        <h1 className="text-2xl font-bold text-center my-4 text-red-400">Error</h1>
                        <p className="px-8 leading-7 font font-serif mb-2">
                            {error.message}
                        </p>
                        <Button onClick={() => refetch()} className="w-fit">Retry</Button>
                    </div>
                    <div className="flex justify-between my-4">
                        <Button onClick={prevDate}>Previous Day Image</Button>
                        <Button onClick={nextDate} disabled={!hasNext}>Next Day Image</Button>
                    </div>
                </div>
            )
        }

        return (
            <div className="pt-8">
                <div className="flex flex-col justify-center items-center bg-background/85 rounded-lg py-8">
                    <h1 className="text-2xl font-bold text-center my-4 text-red-400">Error</h1>
                    <p className="px-8 leading-7 font font-serif mb-2">
                        An error occurred
                    </p>
                    <Button onClick={refetch} className="w-fit">Retry</Button>
                </div>
                <div className="flex justify-between my-4">
                    <Button onClick={prevDate}>Previous Day Image</Button>
                    <Button onClick={nextDate} disabled={!hasNext}>Next Day Image</Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col-reverse lg:flex-row justify-center items-stretch gap-2 pb-16 w-full pt-8">
                {
                    status === "pending"
                        ? (
                            <div className="flex items-center justify-center">
                                <LoadingSpinner className="text-primary-foreground dark:text-foreground" />
                            </div>
                        ) : (
                            <>
                                <div className="self-stretch bg-accent/65 rounded-lg w-full lg:w-1/2 flex flex-col justify-center items-center text-accent-foreground py-8">
                                    <h1 className="text-2xl font-bold text-center my-4">{data.title}</h1>
                                    <p className="px-8 italic leading-7 font explanation font-serif mb-2">
                                        {data.explanation}
                                    </p>
                                    <p className="text-sm italic font-bold copyright">{data.copyright}</p>
                                    <p className="text-sm italic">{new Date(data.date).toDateString()}</p>
                                </div>

                                <div className="w-full min-h-full self-stretch lg:w-1/2 flex justify-center items-center">
                                    {data.media_type === "video" ?
                                        (
                                            <iframe src={data.url} className="min-h-[calc(50dvh)] min-w-full" allowFullScreen />
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <PhotoProvider>
                                                    <PhotoView src={data.url}>
                                                        <img className="rounded-lg h-full overflow-x-hidden object-contain cursor-pointer" src={data.url} />
                                                    </PhotoView>
                                                </PhotoProvider>

                                                <a href={data.hdurl} target="_blank"
                                                    className={buttonVariants({ variant: "default", className: "w-fit mx-auto" })}
                                                ><ExternalLink size={18} className="mr-2" /> HD image
                                                </a>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        )
                }
            </div>
            <div className="flex justify-between my-4">
                <Button onClick={prevDate}>Previous Day Image</Button>
                <Button onClick={nextDate} disabled={!hasNext}>Next Day Image</Button>
            </div>
        </div>
    )
}