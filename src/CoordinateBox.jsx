import React from "react";
import styled from "styled-components";

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
  return (
    <Box>
      <strong>Longitude:</strong>
      <span>12.4792</span>
      <Divider />
      <strong>Latitude:</strong>
      <span>41.8897</span>
      <Divider />
      <strong>Zoom:</strong>
      <span>14</span>
    </Box>
  );
};

export default CoordinateBox;
