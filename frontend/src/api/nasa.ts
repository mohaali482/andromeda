const BACKEND_URL = process.env.BACKEND_URL;

export const APOD_URL = `${BACKEND_URL}/apod`;
const MARS_ROVER_PHOTOS = `${BACKEND_URL}/mars/:rover/photos`;

export function buildMarsRoverPhotosURL(
  page: number,
  rover: string,
  camera: string,
  sol: number,
  earthDate: string
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (camera && camera !== "all") {
    params.append("camera", camera);
  }
  if (earthDate) {
    params.append("earth_date", earthDate);
  } else {
    params.append("sol", sol.toString());
  }
  return `${MARS_ROVER_PHOTOS.replace(":rover", rover)}?${params.toString()}`;
}
