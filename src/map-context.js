import React, { useReducer } from "react";
import axios from "axios";

const MapContext = React.createContext();

const initialState = {
  lng: 12.4792,
  lat: 41.8897,
  zoom: 14,
  place: "Roma",
  region: "Rome",
  country: "Italy",
};

const mapReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "move":
      return { ...state, ...payload };
    case "location received":
      return { ...state, ...payload };
    case "location not found":
      return { ...state, place: null, region: null, country: null };
    default:
      return state;
  }
};

const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);
  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};

const useMap = () => {
  const context = React.useContext(MapContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a MapProvider");
  }
  return context;
};

const getLocation = async (dispatch, coordinates) => {
  dispatch({ type: "fetch location", coordinates });
  try {
    const { lng, lat } = coordinates;
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=region,place,country&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
    );
    const { features } = data;
    if (!features.length) {
      dispatch({ type: "location not found" });
    } else {
      const place = features.reduce((acc, obj) => {
        const { place_type, text } = obj;
        return {
          ...acc,
          [place_type[0]]: text,
        };
      }, {});
      dispatch({ type: "location received", payload: place });
    }
  } catch (error) {
    dispatch({ type: "location error", error });
  }
};

export { MapProvider, useMap, getLocation };
