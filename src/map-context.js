import React, { useReducer } from "react";
import axios from "axios";

const MapContext = React.createContext();

const initialState = {
  lng: 9.240184722799995,
  lat: 45.997446529216944,
  zoom: 1,
  pitch: 0,
  bearing: 0,
  mapRef: null,
};

const mapReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "set map reference": {
      const { mapRef } = payload;
      return { ...state, mapRef };
    }
    case "move":
      return { ...state, ...payload };
    case "location received": {
      const { place, region, country } = payload;
      return { ...state, place, region, country };
    }
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
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};

const getMapPosition = async (dispatch, coordinates) => {
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

export { MapProvider, useMap, getMapPosition };
