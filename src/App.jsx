import React from "react";
// import InfoBox from "./InfoBox";
import Map from "./Map";
import { MapProvider } from "./map-context";
import { UserProvider } from "./user-context";

const App = () => {
  return (
    <UserProvider>
      <MapProvider>
        {/* <InfoBox /> */}
        <Map />
      </MapProvider>
    </UserProvider>
  );
};

export default App;
