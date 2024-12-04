import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

import { useStyles } from "./sectionMap.styles";

const SectionMap = () => {
  const { classes } = useStyles();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  });
  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: 50.343979, lng: 30.396844 }}
          zoom={15}
          mapContainerClassName={classes.mapContainer}
        ></GoogleMap>
      ) : null}
    </div>
  );
};
export default SectionMap;
