import React from "react";
// import InfoBox from "./InfoBox";
import Map from "./Map";
import { MapProvider } from "./map-context";

const App = () => {
  return (
    <MapProvider>
      {/* <InfoBox /> */}
      <Map />
    </MapProvider>
  );
};

export default App;
