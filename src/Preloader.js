import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { flyToLocation, useMap } from "./map-context";
import { getUserLocation, useUser } from "./user-context";
import { Globe } from "./assets/icons";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    dispatch,
    state: { longitude, latitude, message },
  } = useUser();
  const { dispatch: dispatchMap } = useMap();
  // Determine if user location has been returned
  const locationReceived = !!Math.abs(longitude) && !!Math.abs(latitude);
  useEffect(() => {
    getUserLocation(dispatch);
  }, [dispatch]);
  useEffect(() => {
    // Flip loading state if user location is found or status message received
    if ((locationReceived || message) && isLoading) {
      // If user location received, fly to that location
      // TODO: Restore back to mapRef usage
      if (locationReceived) {
        flyToLocation(dispatchMap, {
          center: [longitude, latitude],
          zoom: 11,
          curve: Math.pow(6, 0.25),
        });
      }
      // Transition out of loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [locationReceived, dispatchMap, longitude, latitude, message, isLoading]);
  return (
    <Menu passive={!isLoading}>
      <div
        className={`flex-initial text-gray-100 ${
          message ? "" : !locationReceived ? "animate-bounce" : "animate-spin"
        }`}
      >
        <Globe />
      </div>
      {!!message ? (
        <p className="font-sans text-xl text-gray-100 font-semibold">
          {message}
        </p>
      ) : !locationReceived ? (
        <p className="font-sans text-xl text-gray-100 font-bold">
          Finding location
        </p>
      ) : (
        <p className="font-sans text-xl text-gray-100 font-bold">Found you!</p>
      )}
    </Menu>
  );
};

export default Preloader;
