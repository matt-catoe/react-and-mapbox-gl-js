import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { useMap /* getMapPosition */ } from "./map-context";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef();
  // TODO: Look for best practices for store map reference
  const [mapRef, setMapRef] = useState(null);
  const {
    dispatch,
    state: { lng, lat, zoom, newLocation },
  } = useMap();
  useEffect(() => {
    // Instantiate base map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      zoom,
    });
    setMapRef(map);
    // Get location data via reverse geocoding
    // getMapPosition(dispatch, { lng, lat });
    map.on("load", () => {
      // Set map reference in context
      dispatch({ type: "set map reference", payload: { mapRef: map } });
      // Add elevation source
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      // Set terrain property of the style
      map.setTerrain({ source: "mapbox-dem" });
      // Add sky layer https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#sky
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
    });
    // Update state with current map positioning
    map.on("moveend", () => {
      dispatch({
        type: "move",
        payload: {
          ...map.getCenter(),
          zoom: map.getZoom(),
          pitch: map.getPitch(),
          bearing: map.getBearing(),
        },
      });
    });
    /**
     * TODO: Move this to Preloader and get user location
     * This handles reverse geocoding on moveend
     */
    // map.on("moveend", () => {
    //   getMapPosition(dispatch, map.getCenter());
    // });
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!!newLocation) {
      // TODO: Perhaps switch to mapRef from context
      mapRef.flyTo(newLocation);
    }
  }, [mapRef, newLocation]);
  return <div className="map-container" ref={mapContainer} />;
};

export default Map;
