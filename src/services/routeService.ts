import axios from "axios";
import { config } from "../config/config";

export const getRouteService = async (
  origin: string,
  destination: string,
  waypoints?: string
) => {
  const apiKey = config.google.mapsKey;

  let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${apiKey}`;

  if (waypoints) {
    url += `&waypoints=${waypoints}`;
  }

  const response = await axios.get(url);
  const data = response.data;

  if (!data.routes || data.routes.length === 0) {
    throw new Error("No route found");
  }

  const route = data.routes[0];
  const leg = route.legs[0];

  return {
    polyline: route.overview_polyline.points,
    distance: leg?.distance?.text,
    duration: leg?.duration?.text
  };
};
