import React from "react";
import Map from "./Map";
import Preloader from "./Preloader";
import { MapProvider } from "./map-context";
import { UserProvider } from "./user-context";

const App = () => {
  return (
    <UserProvider>
      <MapProvider>
        <Map />
        <Preloader />
      </MapProvider>
    </UserProvider>
  );
};

export default App;
