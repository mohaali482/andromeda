import { APOD_URL } from "@/api/nasa";
import { ApodData } from "@/types/apod";
import { useQuery } from "@tanstack/react-query";

export function useGetApod(date = "") {
  return useQuery<ApodData>({
    queryKey: ["apod", date],
    queryFn: async () => {
      const response = await fetch(APOD_URL + `?date=${date}`);
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
