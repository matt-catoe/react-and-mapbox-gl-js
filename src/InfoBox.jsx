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
  margin: 16px;
`;

const Text = styled.h1`
  margin: 0;
  padding: 0;
  color: lightsalmon;
`;

const InfoBox = () => {
  const {
    state: { place, region, country },
  } = useMap();
  return (
    <Box>
      <Text>
        {place && `${place}, `}
        {region && `${region}, `}
        {country && `${country}`}
      </Text>
    </Box>
  );
};

export default InfoBox;
