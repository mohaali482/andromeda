import { ROVERS } from "../constants/data";
import { Rover } from "../types/mars-rover-photos";

export function validateCamera(rover: Rover, cameraQuery: string): boolean {
  if (cameraQuery !== "all" && !rover.cameras.includes(cameraQuery)) {
    console.log("Invalid camera name", cameraQuery);
    return false;
  }
  return true;
}

export function validateQueryParams(
  solQuery: string,
  earthDateQuery: string
): boolean {
  if (earthDateQuery && solQuery) {
    console.log("Cannot query by both earth_date and sol");
    return false;
  }

  if (!earthDateQuery && !solQuery) {
    console.log("Must query by either earth_date or sol");
    return false;
  }

  return true;
}

export function validateEarthDate(earthDateQuery: string): boolean {
  if (earthDateQuery && !earthDateQuery.match(/\d{4}-\d{2}-\d{2}/)) {
    if (new Date(earthDateQuery) > new Date()) {
      console.log("Earth date cannot be in the future", earthDateQuery);
      return false;
    }
    if (new Date(earthDateQuery).toString() === "Invalid Date") {
      console.log("Error parsing earth_date", earthDateQuery);
      return false;
    }
  }
  return true;
}

export function validateSol(solQuery: string): boolean {
  if (solQuery && isNaN(parseInt(solQuery))) {
    console.log("Error parsing sol", solQuery);
    return false;
  }
  return true;
}

export function validatePage(pageQuery: string): boolean {
  if (isNaN(parseInt(pageQuery))) {
    console.log("Error parsing page", pageQuery);
    return false;
  }
  return true;
}

export function validateRover(rover: string): boolean {
  return ROVERS.find((r) => r.name === rover) ? true : false;
}
