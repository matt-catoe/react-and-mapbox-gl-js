import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { useMap, getLocation } from "./map-context";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef();
  const {
    dispatch,
    state: { lng, lat, zoom },
  } = useMap();
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      zoom,
    });
    getLocation(dispatch, { lng, lat });
    map.on("load", () => {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem" });
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
      setTimeout(() => {
        map.easeTo({ pitch: 70 });
      }, 1000);
    });
    map.on("move", () => {
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
     * This handles reverse geocoding on moveend
     */
    // map.on("moveend", () => {
    //   getLocation(dispatch, map.getCenter());
    // });
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="map-container" ref={mapContainer} />;
};

export default Map;
