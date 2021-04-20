import React from "react";
import CoordinateBox from "./CoordinateBox";
import Map from "./Map";
import { MapProvider } from "./map-context";

const App = () => {
  return (
    <MapProvider>
      <CoordinateBox />
      <Map />
    </MapProvider>
  );
};

export default App;
