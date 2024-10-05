import { useGetMarsPhotos } from "@/hooks/useGetMarsPhotos";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./loading-spinner";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useAtom } from "jotai";
import { marsPhotoError, marsPhotoLoading, marsPhotosCount } from "@/atoms/mars-photo";
import { useEffect } from "react";

export default function PhotoGallery() {
    const [_count, setCount] = useAtom(marsPhotosCount)
    const [_loading, setLoading] = useAtom(marsPhotoLoading)
    const [_error, setError] = useAtom(marsPhotoError)

    const [searchParams, _setSearchParams] = useSearchParams();
    const { data, status, error, refetch } = useGetMarsPhotos(
        parseInt(searchParams.get("page") || "1"),
        searchParams.get("rover") || "",
        searchParams.get("camera") || "",
        parseInt(searchParams.get("sol") || "0"),
        searchParams.get("earth_date") || ""
    );

    useEffect(() => {
        if (data) {
            setCount(data.photos.length)
        }
    }, [data, setCount])

    useEffect(() => {
        if (status === "pending") {
            setLoading(true)
        } else {
            setLoading(false)
        }

        if (status === "error") {
            setError(error.message)
        } else {
            setError(null)
        }
    }, [status, setLoading, error, setError])

    return (
        <div className="w-full min-h-full">
            {status === "pending" && <LoadingSpinner className="m-auto text-white" />}
            {status === "error" && (
                <div className="flex flex-col items-center m-auto text-primary-foreground dark:text-primary text-lg">
                    {error.message}
                    <Button className="w-fit" onClick={() => refetch()}>Retry</Button>
                </div>
            )}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                <PhotoProvider>
                    {status === "success" && data?.photos.map((photo) => (
                        <div key={photo.id}>
                            <PhotoView src={photo.img_src}>
                                <img
                                    src={photo.img_src}
                                    alt={photo.camera.full_name}
                                    className="w-full h-64 object-cover cursor-pointer"
                                />
                            </PhotoView>
                            <div className="p-2 bg-black bg-opacity-50 text-white">
                                <p className="text-sm">{photo.camera.full_name}</p>
                            </div>
                        </div>
                    ))}
                </PhotoProvider>
            </div>
        </div>
    );
}