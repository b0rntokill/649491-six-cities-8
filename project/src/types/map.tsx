export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Point = {
  id: number;
  location: Location;
};

export type Points = Point[];
