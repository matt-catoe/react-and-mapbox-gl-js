import { useEffect, useState } from "react";
import { useMap } from "./map-context";
import { useUser } from "./user-context";

const User = () => {
  const [initialized, setInitialized] = useState(false);
  const {
    state: { longitude, latitude },
  } = useUser();
  const {
    state: { mapRef },
  } = useMap();

  useEffect(() => {
    if (!initialized && mapRef && longitude && latitude) {
      const data = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          },
        ],
      };
      mapRef.addSource("user-location", { type: "geojson", data: data });
      mapRef.addLayer({
        id: "user-location-marker",
        type: "circle",
        source: "user-location",
        layout: {},
        paint: {
          "circle-color": "#6ee7b7",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
      setInitialized(true);
    }
  }, [mapRef, longitude, latitude, initialized, setInitialized]);
  useEffect(() => {
    return () => {
      return () => {
        mapRef.removeSource("user-location");
        mapRef.removeLayer("user-location-marker");
      };
    };
  }, [mapRef]);
  return null;
};

export default User;
