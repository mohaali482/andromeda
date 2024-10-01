import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from "react-router-dom";
import 'react-photo-view/dist/react-photo-view.css';
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
    const title = "Comet Tsuchinshan-ATLAS over Mexico"
    const text = "The new comet has passed its closest to the Sun and is now moving closer to the Earth. C/2023 A3 (Tsuchinshan–ATLAS) is currently moving out from inside the orbit of Venus and on track to pass its nearest to the Earth in about two weeks.  Comet Tsuchinshan-ATLAS, pronounced \"Choo-cheen-shahn At-less,\", is near naked-eye visibility and easily picked up by long-exposure cameras.  The comet can also now be found by observers in Earth's northern hemisphere as well as the south.  The featured image was captured just a few days ago above Zacatecas, Mexico. Because clouds were obscuring much of the pre-dawn sky, the astrophotographer released a drone to take pictures from higher up, several of which were later merged to enhance the comet's visibility. Although the future brightness of comets is hard to predict, there is increasing hope that Comet Tsuchinshan-ATLAS will further brighten as it enters the early evening sky.   Growing Gallery: Comet Tsuchinsan-ATLAS in 2024"
    const copyright = "\nDaniel Korona\n";
    const date = new Date("2024-09-30").toDateString();
    const media_type = "video"
    const url = "https://www.youtube.com/embed/ExGvwNuKyMc?ref=0"
    const prevURL = "some-url"
    const nextURL = "some-url"

    return (
        <div>
            <div className="flex justify-between my-4 lg:hidden">
                <Link to="/" className={buttonVariants({ variant: "default" })}>Prev</Link>
                <Link to="/" className={buttonVariants({ variant: "default" })}>Next</Link>
            </div>
            <div className="flex gap-2 items-center">
                <Link className="hidden lg:block" to="/"><ArrowLeftCircle size={40} /></Link>
                <div className="flex flex-col-reverse lg:flex-row justify-between items-stretch gap-2 pb-16 w-full">
                    <div className="self-stretch bg-accent/65 rounded-lg w-full lg:w-1/2 flex flex-col justify-center items-center text-accent-foreground py-8">
                        <h1 className="text-2xl font-bold text-center my-4">{title}</h1>
                        <p className="px-8 italic leading-7 font explanation font-serif mb-2">
                            {text}
                        </p>
                        <p className="text-sm italic font-bold copyright">{copyright}</p>
                        <p className="text-sm italic">{date}</p>
                    </div>

                    <div className="w-full min-h-full self-stretch lg:w-1/2 flex justify-center items-center">
                        {media_type === "video" ?
                            (
                                <iframe src={url} className="min-h-[calc(50dvh)] min-w-full" allowFullScreen />
                            ) : (
                                <PhotoProvider>
                                    <PhotoView src={url}>
                                        <img className="rounded-lg h-full overflow-x-hidden object-contain" src={url} />
                                    </PhotoView>
                                </PhotoProvider>
                            )
                        }
                    </div>
                </div>
                <Link className="hidden lg:block" to="/"><ArrowRightCircle size={40} /></Link>
            </div>
        </div>
    )
}