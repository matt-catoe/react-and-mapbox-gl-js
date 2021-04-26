import React from "react";
import styled from "styled-components";
import { useMap } from "./map-context";

const Box = styled.section`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 99;
  margin: 16px 16px 16px 0;
  padding: 8px 12px;
  border: 3px solid #c17767;
  border-left: 0;
  border-radius: 0 24px 24px 0;
  background-color: cornsilk;
  width: fit-content;
  box-shadow: -5px 5px 50px 0 #000000;
`;

const Text = styled.h3`
  margin: 0;
  padding: 0;
  color: #c17767;
`;

const InfoBox = () => {
  const {
    state: { place, region, country },
  } = useMap();
  return place || region || country ? (
    <Box>
      <Text>
        {place && `${place}, `}
        {region && `${region}, `}
        {country && `${country}`}
      </Text>
    </Box>
  ) : null;
};

export default InfoBox;
