import React from "react";
import styled from "styled-components";
import { useMap } from "./map-context";

const Box = styled.section`
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 99;
  margin: 16px;
  padding: 8px;
  background-color: saddlebrown;
  color: white;
  border: 1px solid whitesmoke;
  filter: drop-shadow(10px 10px 30px #000000);
`;

const Divider = styled.div`
  padding: 4px;
`;

const CoordinateBox = () => {
  const {
    state: { lng, lat, zoom },
  } = useMap();
  return (
    <Box>
      <strong>Longitude:</strong>
      <span>{lng.toFixed(4)}</span>
      <Divider />
      <strong>Latitude:</strong>
      <span>{lat.toFixed(4)}</span>
      <Divider />
      <strong>Zoom:</strong>
      <span>{zoom.toFixed(2)}</span>
    </Box>
  );
};

export default CoordinateBox;
