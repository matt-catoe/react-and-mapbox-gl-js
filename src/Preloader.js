import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { flyToLocation, useMap } from "./map-context";
import { getUserLocation, useUser } from "./user-context";

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
      // If user location received, fly to
      if (locationReceived) {
        flyToLocation(dispatchMap, {
          center: [longitude, latitude],
          zoom: 11,
          curve: Math.pow(6, 0.25),
        });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [locationReceived, dispatchMap, longitude, latitude, message, isLoading]);
  return (
    <Menu closed={!isLoading}>
      {!message ? (
        <div
          className={`flex-initial text-gray-100 ${
            !locationReceived ? "animate-bounce" : "animate-spin"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-gray-100 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      )}
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
