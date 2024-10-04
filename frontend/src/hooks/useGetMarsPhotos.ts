import { buildMarsRoverPhotosURL } from "@/api/nasa";
import { MarsRoverResponse } from "@/types/mars-rover-photos";
import { useQuery } from "@tanstack/react-query";

export function useGetMarsPhotos(
  page: number,
  rover: string,
  camera: string,
  sol: number,
  earthDate: string
) {
  const link = buildMarsRoverPhotosURL(page, rover, camera, sol, earthDate);
  return useQuery<MarsRoverResponse>({
    queryKey: ["mars-photos", link],
    queryFn: async () => {
      const response = await fetch(link);
      if (response.status !== 200) {
        if (response) {
          throw new Error((await response.json()).error);
        } else {
          throw new Error("An error occurred");
        }
      }
      return response.json();
    },
  });
}
