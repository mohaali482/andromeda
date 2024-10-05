export type Rover = {
  name: string;
  cameras: string[];
};

type MarsRoverPhotosData = {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
};

export type MarsRoverResponse = {
  photos: MarsRoverPhotosData[];
};
