import React, { useReducer } from "react";

const MapContext = React.createContext();

const initialState = {
  lng: 12.4792,
  lat: 41.8897,
  zoom: 14,
};

const mapReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "move":
      return { ...state, ...payload };
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

export { MapProvider, useMap };
