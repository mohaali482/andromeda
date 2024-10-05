import { Rover } from "../types/mars-rover-photos";

export const ROVERS: Rover[] = [
  {
    name: "curiosity",
    cameras: ["fhaz", "rhaz", "mast", "chemcam", "mahli", "mardi", "navcam"],
  },
  {
    name: "opportunity",
    cameras: ["fhaz", "rhaz", "navcam", "pancam", "minites"],
  },
  {
    name: "spirit",
    cameras: ["fhaz", "rhaz", "navcam", "pancam", "minites"],
  },
];
